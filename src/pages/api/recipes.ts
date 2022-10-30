import { NextApiHandler } from 'next';
import { unstable_getServerSession } from 'next-auth';

import { supabase } from '@app/api/supabase';
import { BlankRecipe } from '@app/common/models';

import { authOptions } from './auth/[...nextauth]';

const handler: NextApiHandler = (req, res) => {
  if (req.method === 'GET') {
    return handleGet(req, res);
  }

  if (req.method === 'POST') {
    return handleCreate(req, res);
  }
};

const handleGet: NextApiHandler = async (_, res) => {
  const recipes = await supabase.from('recipes').select('*');

  return res.status(200).json(recipes.data);
};

const handleCreate: NextApiHandler = async (req, res) => {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const recipe: BlankRecipe = JSON.parse(req.body);

  const { data, error, status } = await supabase
    .from('recipes')
    .insert({
      ...recipe,
      userId: session.user.id,
    })
    .select('*');

  if (error || !data) {
    return res.status(status).json({ error });
  }

  return res.status(status).json(data.at(0));
};

export default handler;
