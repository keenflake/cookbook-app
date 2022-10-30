import clsx from 'clsx';
import { useField } from 'formik';
import { ComponentPropsWithoutRef, FC } from 'react';

import { FieldError, FieldLabel } from '@app/common/components';

type Props = Omit<ComponentPropsWithoutRef<'textarea'>, 'name'>;

export interface TextAreaFieldProps extends Props {
  name: string;
  label?: string;
}

export const TextAreaField: FC<TextAreaFieldProps> = ({ name, label, id, className, ...textAreaProps }) => {
  const [field, meta] = useField(name);

  return (
    <div className="flex flex-col">
      {label && (
        <FieldLabel htmlFor={id} className="self-start">
          {label}
        </FieldLabel>
      )}
      <textarea
        className={clsx(
          'px-4',
          'py-3',
          'bg-white disabled:bg-gray-200',
          'border-2',
          'border-gray-200 focus:border-emerald-500',
          'ring-0',
          'rounded-md',
          'transition-colors',
          'disabled:cursor-not-allowed',
          'font-sans',
          'font-medium',
          className,
        )}
        id={id}
        {...textAreaProps}
        {...field}
      />
      {meta.error && meta.touched && <FieldError>{meta.error}</FieldError>}
    </div>
  );
};
