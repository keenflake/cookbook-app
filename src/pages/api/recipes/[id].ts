import { NextApiHandler } from 'next';
import { unstable_getServerSession } from 'next-auth';

import { supabase } from '@app/api/supabase';
import { Recipe } from '@app/common/models';

import { authOptions } from '../auth/[...nextauth]';

const deleteRecipeAndMedia = async (recipe: Recipe): Promise<void> => {
  await Promise.all([
    supabase.storage.from('images').remove([recipe.image]),
    supabase.from('recipes').delete().eq('id', recipe.id),
  ]);
};

const handleDelete: NextApiHandler = async (req, res) => {
  const recipeId = req.query.id;

  if (!recipeId) {
    return res.status(404).json({ message: 'Not found' });
  }

  const id = typeof recipeId === 'string' ? recipeId : recipeId.at(0)!;

  const response$ = supabase.from('recipes').select('*').eq('id', id);
  const session$ = unstable_getServerSession(req, res, authOptions);

  const [response, session] = await Promise.all([response$, session$]);

  const recipe: Recipe | undefined = response.data?.at(0);

  if (!recipe) {
    return res.status(404).json({ message: 'Not found' });
  }

  if (recipe.userId !== session?.user.id) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  try {
    await deleteRecipeAndMedia(recipe);
  } catch (_err) {
    const err = _err as Error;

    return res.status(500).json({ message: err.message });
  }

  return res.status(204).send(null);
};

const handler: NextApiHandler = (req, res) => {
  if (req.method === 'DELETE') {
    return handleDelete(req, res);
  }

  return res.status(404).json({ message: 'Not found' });
};

export default handler;
