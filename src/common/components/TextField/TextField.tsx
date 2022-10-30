import clsx from 'clsx';
import { useField } from 'formik';
import { ComponentPropsWithoutRef, FC } from 'react';

import { FieldError, FieldLabel } from '@app/common/components';

type Props = Omit<ComponentPropsWithoutRef<'input'>, 'type' | 'name'>;

export interface TextFieldProps extends Props {
  type?: 'email' | 'number' | 'password' | 'search' | 'tel' | 'text' | 'url';
  name: string;
  label?: string;
}

export const TextField: FC<TextFieldProps> = ({ name, label, id, type = 'text', className, ...inputProps }) => {
  const [field, meta] = useField(name);

  return (
    <div className="flex flex-col w-full">
      {label && (
        <FieldLabel htmlFor={id} className="self-start">
          {label}
        </FieldLabel>
      )}

      <input
        type={type}
        id={id}
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
          'leading-none',
          className,
        )}
        {...inputProps}
        {...field}
      />

      {meta.error && meta.touched && <FieldError>{meta.error}</FieldError>}
    </div>
  );
};
