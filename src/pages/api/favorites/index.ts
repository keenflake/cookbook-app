import { NextApiHandler } from 'next';
import { unstable_getServerSession } from 'next-auth';

import { supabase } from '@app/api/supabase';

import { authOptions } from '../auth/[...nextauth]';

const handleCreate: NextApiHandler = async (req, res) => {
  const payload = JSON.parse(req.body);

  if (!payload.recipeId) {
    return res.status(400).json({ message: "Missing 'recipeId' param" });
  }

  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  /**
   * Check if already has favorite
   */
  const response = await supabase
    .from('favorites')
    .select('*')
    .eq('userId', session.user.id)
    .eq('recipeId', payload.recipeId);

  if (response.data && response.data.length === 1) {
    return res.status(400).json({ message: 'Recipe is already favorite' });
  }

  await supabase.from('favorites').insert({ userId: session.user.id, recipeId: payload.recipeId });

  return res.status(201).json({ message: 'Success' });
};

const handler: NextApiHandler = (req, res) => {
  if (req.method === 'POST') {
    return handleCreate(req, res);
  }

  return res.status(404).json({ message: 'Not found' });
};

export default handler;
