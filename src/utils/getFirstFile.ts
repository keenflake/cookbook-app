import { File, Files } from 'formidable';

export const getFirstFile = (files: Files, key: string): File | null => {
  const field = files[key];

  if (Array.isArray(field)) {
    return field[0] || null;
  }

  return field;
};
