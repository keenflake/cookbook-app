import { ImageLoader } from 'next/image';

import { assert } from '@app/common/utils';

assert(
  typeof process.env.NEXT_PUBLIC_SUPABASE_PUBLIC_IMAGES_HOST === 'string',
  `"NEXT_PUBLIC_SUPABASE_PUBLIC_IMAGES_HOST" env is not defined`,
);

export const loader: ImageLoader = ({ src, width }) => {
  const isGoogle = src.includes('googleusercontent');

  if (isGoogle) {
    return `${src}-w${width}`;
  }

  const isSupabase = src.startsWith('public/');

  if (isSupabase) {
    return `${process.env.NEXT_PUBLIC_SUPABASE_PUBLIC_IMAGES_HOST}/${src}`;
  }

  return src;
};
