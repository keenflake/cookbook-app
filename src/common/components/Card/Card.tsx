import clsx from 'clsx';
import { ComponentPropsWithoutRef, FC } from 'react';

type Props = ComponentPropsWithoutRef<'div'>;

export interface CardProps extends Props {}

export const Card: FC<CardProps> = ({ className, ...props }) => (
  <div className={clsx('p-4', 'border', 'border-gray-200', 'rounded-lg', className)} {...props} />
);
