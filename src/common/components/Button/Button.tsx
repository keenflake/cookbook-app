import clsx from 'clsx';
import { ComponentPropsWithoutRef, FC } from 'react';

import { Icon } from '@app/common/components/';
import { svgs } from '@app/common/svgs';
import { SVGProps } from '@app/common/types';

type Props = ComponentPropsWithoutRef<'button'>;

export interface ButtonProps extends Props {
  appearance?: 'primary' | 'secondary';
  size?: 'sm' | 'md';
  icon?: keyof typeof svgs;
  iconProps?: SVGProps;
  iconPosition?: 'left' | 'right';
}

export const Button: FC<ButtonProps> = ({
  className,
  appearance = 'primary',
  size = 'md',
  icon,
  iconProps = {},
  iconPosition = 'left',
  children,
  ...buttonProps
}) => (
  <button
    className={clsx(
      'inline-flex',
      'items-center',
      iconPosition === 'left' ? 'flex-row' : 'flex-row-reverse',
      'gap-2',
      size === 'sm' && ['px-2', 'py-1'],
      size === 'md' && ['px-3', 'py-2'],
      'rounded-md',
      'transition-colors',
      appearance === 'primary' && ['bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700', 'text-white'],
      appearance === 'secondary' && [
        'bg-white hover:bg-emerald-500 active:bg-emerald-600',
        'border-2',
        'border-emerald-500 active:border-emerald-600',
        'hover:text-white',
      ],
      className,
    )}
    {...buttonProps}
  >
    {icon && <Icon kind={icon} {...iconProps} />}
    <span className="font-medium">{children}</span>
  </button>
);
