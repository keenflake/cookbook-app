import clsx from 'clsx';
import { ComponentPropsWithoutRef, FC } from 'react';

type LabelProps = ComponentPropsWithoutRef<'label'>;

export interface FieldLabelProps extends LabelProps {}

export const FieldLabel: FC<FieldLabelProps> = ({ className, ...labelProps }) => (
  <label className={clsx('font-medium', 'mb-2', 'ml-4', className)} {...labelProps} />
);
