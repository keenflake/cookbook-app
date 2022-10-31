import { Files, IncomingForm } from 'formidable';
import { NextApiRequest } from 'next';

export interface ParsedFormData<T> {
  fields: T;
  files: Files;
}

export const parseFormData = <T extends any>(req: NextApiRequest): Promise<ParsedFormData<T>> => {
  const form = new IncomingForm({ keepExtensions: true });

  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) {
        reject(err);
      }

      resolve({ fields, files } as ParsedFormData<T>);
    });
  });
};
