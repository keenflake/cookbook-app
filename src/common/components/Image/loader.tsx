import { ImageLoader } from 'next/image';

export const loader: ImageLoader = ({ src, width }) => {
  const isGoogle = src.includes('googleusercontent');

  if (isGoogle) {
    return `${src}-w${width}`;
  }

  return src;
};
