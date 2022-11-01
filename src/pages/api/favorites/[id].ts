import { NextApiHandler } from 'next';
import { unstable_getServerSession } from 'next-auth';

import { supabase } from '@app/api/supabase';

import { authOptions } from '../auth/[...nextauth]';

const handleDelete: NextApiHandler = async (req, res) => {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ message: 'Missing id param' });
  }

  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const response = await supabase.from('favorites').select('*').eq('userId', session.user.id).eq('recipeId', id);

  if (!response.data || response.data.length === 0) {
    return res.status(404).json({ message: 'Record not found' });
  }

  await supabase.from('favorites').delete().eq('id', response.data.at(0).id);

  return res.status(204).json({});
};

const handler: NextApiHandler = (req, res) => {
  if (req.method === 'DELETE') {
    return handleDelete(req, res);
  }

  return res.status(404).json({ message: 'Not found' });
};

export default handler;
