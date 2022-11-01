import clsx from 'clsx';
import { useField } from 'formik';
import { ComponentPropsWithoutRef, FC } from 'react';

import { FieldError, FieldLabel } from '@app/common/components';

import styles from './SelectField.module.css';

type Props = Omit<ComponentPropsWithoutRef<'select'>, 'name'>;

export interface Option {
  label: string;
  value?: string | number;
}

export interface SelectFieldProps extends Props {
  name: string;
  label?: string;
  options: Option[];
  appendBlankOption?: boolean;
}

export const SelectField: FC<SelectFieldProps> = ({
  label,
  id,
  className,
  options,
  appendBlankOption = true,
  ...props
}) => {
  const [inputProps, meta] = useField(props);

  return (
    <div className="flex flex-col">
      {label && <FieldLabel htmlFor={id}>{label}</FieldLabel>}
      <select className={clsx(styles.select, className)} id={id} {...props} {...inputProps}>
        {appendBlankOption && <option value="">None</option>}
        {options.map(option => (
          <option key={option.label} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {meta.error && meta.touched && <FieldError>{meta.error}</FieldError>}
    </div>
  );
};
