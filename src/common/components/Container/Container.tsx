import clsx from 'clsx';
import { ComponentPropsWithoutRef, FC } from 'react';

type Props = ComponentPropsWithoutRef<'div'>;

export interface ContainerProps extends Props {
  fluid?: boolean;
}

export const Container: FC<ContainerProps> = ({ fluid = false, className, ...props }) => (
  <div className={clsx(!fluid && ['max-w-7xl', 'mx-auto'], 'px-6', className)} {...props} />
);
