import clsx from 'clsx';
import { ComponentPropsWithoutRef, FC } from 'react';

import { Icon, IconProps } from '@app/common/components';
import { svgs } from '@app/common/svgs';

type Props = ComponentPropsWithoutRef<'button'>;

export interface IconButtonProps extends Props {
  icon: keyof typeof svgs;
  iconProps?: Omit<IconProps, 'kind'>;
}

export const IconButton: FC<IconButtonProps> = ({ className, icon, iconProps = {}, ...props }) => {
  return (
    <button
      className={clsx(
        'p-2',
        'bg-white hover:bg-gray-100 active:bg-gray-200',
        'transition-colors',
        'rounded-md',
        className,
      )}
      {...props}
    >
      <Icon kind={icon} {...iconProps} className={clsx('w-6', 'h-6', iconProps.className)} />
    </button>
  );
};
