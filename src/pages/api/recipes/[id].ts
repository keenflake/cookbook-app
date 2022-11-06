import crypto from 'crypto';
import { readFileSync } from 'fs';
import { NextApiHandler } from 'next';
import { unstable_getServerSession } from 'next-auth';
import path from 'path';

import { supabase } from '@app/api/supabase';
import { Recipe } from '@app/common/models';
import { getFirstFile } from '@app/utils/getFirstFile';
import { parseFormData } from '@app/utils/parseFormData';

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

const handlePut: NextApiHandler = async (req, res) => {
  const recipeId = req.query.id;

  if (!recipeId) {
    return res.status(400).json({ message: 'No recipe id was provided' });
  }

  const id = typeof recipeId === 'string' ? recipeId : recipeId.at(0);

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

  const { fields, files } = await parseFormData<any>(req);
  const image = getFirstFile(files, 'image');

  // Handle case when user updates image
  if (image) {
    // First delete previous image
    await supabase.storage.from('images').remove([recipe.image]);

    // Upload new
    const name = `public/${crypto.randomUUID()}${path.extname(image.originalFilename || image.newFilename)}`;
    const file = readFileSync(image.filepath);

    const { error, data } = await supabase.storage.from('images').upload(name, file, { contentType: image.mimetype! });

    if (error || !data) {
      return res.status(500).json({ message: 'Error during file upload' });
    }

    fields.image = data.path;
  }

  const { data, error, status } = await supabase
    .from('recipes')
    .update({
      ...fields,
      ingredients: JSON.parse(fields.ingredients),
      preparationSteps: JSON.parse(fields.preparationSteps),
    })
    .eq('id', recipe.id)
    .select('*');

  if (error || !data) {
    return res.status(status).json({ error });
  }

  return res.status(200).json(data.at(0));
};

const handler: NextApiHandler = (req, res) => {
  if (req.method === 'DELETE') {
    return handleDelete(req, res);
  }

  if (req.method === 'PUT') {
    return handlePut(req, res);
  }

  return res.status(404).json({ message: 'Not found' });
};

/**
 * Disable `bodyParser` since we're handling it ourselves with `formidable`
 */
export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
