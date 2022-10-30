import clsx from 'clsx';
import Link from 'next/link';
import { ComponentPropsWithoutRef, FC, useMemo } from 'react';

import { Icon } from '@app/common/components';
import { svgs } from '@app/common/svgs';
import { SVGProps } from '@app/common/types';

type Props = ComponentPropsWithoutRef<'button'>;

export interface ButtonProps extends Props {
  link?: string;
  appearance?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  icon?: keyof typeof svgs;
  iconProps?: SVGProps;
  iconPosition?: 'left' | 'right';
}

export const Button: FC<ButtonProps> = ({
  link,
  className,
  appearance = 'primary',
  size = 'md',
  icon,
  iconProps = {},
  iconPosition = 'left',
  children,
  ...buttonProps
}) => {
  const classNames = useMemo(
    () =>
      clsx(
        'inline-flex',
        'items-center',
        iconPosition === 'left' ? 'flex-row' : 'flex-row-reverse',
        'gap-2',
        size === 'sm' && ['px-2', 'py-1'],
        size === 'md' && ['px-3', 'py-2'],
        size === 'lg' && ['px-6', 'py-4'],
        'rounded-md',
        'transition-colors',
        appearance === 'primary' && [
          'bg-emerald-500 enabled:hover:bg-emerald-600 enabled:active:bg-emerald-700 disabled:bg-gray-200',
          'text-white disabled:text-gray-800',
          'disabled:cursor-not-allowed',
        ],
        appearance === 'secondary' && [
          'bg-white hover:bg-emerald-500 active:bg-emerald-600',
          'border-2',
          'border-emerald-500 active:border-emerald-600',
          'text-emerald-500 hover:text-white',
        ],
        className,
      ),
    [iconPosition, size, appearance, className],
  );

  if (link) {
    return (
      <Link href={link} className={classNames}>
        {icon && <Icon kind={icon} {...iconProps} />}
        <span className="font-medium">{children}</span>
      </Link>
    );
  }

  return (
    <button className={classNames} {...buttonProps}>
      {icon && <Icon kind={icon} {...iconProps} />}
      <span className="font-medium">{children}</span>
    </button>
  );
};
