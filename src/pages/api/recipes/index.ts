import crypto from 'crypto';
import { readFileSync } from 'fs';
import { NextApiHandler } from 'next';
import { unstable_getServerSession } from 'next-auth';
import path from 'path';

import { supabase } from '@app/api/supabase';
import { getFirstFile } from '@app/utils/getFirstFile';
import { parseFormData } from '@app/utils/parseFormData';

import { authOptions } from '../auth/[...nextauth]';

const handler: NextApiHandler = (req, res) => {
  if (req.method === 'GET') {
    return handleGet(req, res);
  }

  if (req.method === 'POST') {
    return handleCreate(req, res);
  }

  return res.status(404).json({ message: 'Not found' });
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

  const { fields: recipe, files } = await parseFormData<any>(req);
  const image = getFirstFile(files, 'image');
  let imagePath: string | null = null;

  /**
   * Handle file upload first if image is provided
   */
  if (image) {
    const name = `public/${crypto.randomUUID()}${path.extname(image.originalFilename || image.newFilename)}`;
    const file = readFileSync(image.filepath);

    const { error, data } = await supabase.storage.from('images').upload(name, file, { contentType: image.mimetype! });

    if (error || !data) {
      return res.status(500).json({ message: 'Error during file upload' });
    }

    imagePath = data.path;
  }

  const { data, error, status } = await supabase
    .from('recipes')
    .insert({
      ...recipe,
      /**
       * `formidable` doesn't parse nested values
       */
      ingredients: JSON.parse(recipe.ingredients),
      preparationSteps: JSON.parse(recipe.preparationSteps),
      userId: session.user.id,
      image: imagePath,
    })
    .select('*');

  if (error || !data) {
    return res.status(status).json({ error });
  }

  return res.status(status).json(data.at(0));
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
