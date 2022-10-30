import clsx from 'clsx';
import { ComponentPropsWithoutRef, FC } from 'react';

type Props = ComponentPropsWithoutRef<'p'>;

export interface FieldErrorProps extends Props {}

export const FieldError: FC<FieldErrorProps> = ({ className, ...props }) => (
  <p className={clsx('mt-2', 'ml-4', 'font-medium', 'text-xs', 'text-red-500', className)} {...props} />
);
