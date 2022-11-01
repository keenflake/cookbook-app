import clsx from 'clsx';
import { FC } from 'react';

import { IconButton, IconButtonProps } from '@app/common/components';

export interface FavoriteButtonProps extends Omit<IconButtonProps, 'icon'> {
  favorite?: boolean;
}

export const FavoriteButton: FC<FavoriteButtonProps> = ({ favorite, ...props }) => {
  return (
    <IconButton
      icon="heart"
      {...props}
      iconProps={{ className: clsx('transition-colors', favorite && ['fill-red-500', 'text-red-500']) }}
    />
  );
};
