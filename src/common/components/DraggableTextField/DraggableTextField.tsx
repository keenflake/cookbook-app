import clsx from 'clsx';
import { FC } from 'react';

import { Icon, TextField, TextFieldProps } from '@app/common/components';

export interface DraggableTextFieldProps extends TextFieldProps {}

export const DraggableTextField: FC<DraggableTextFieldProps> = ({ disabled, ...props }) => (
  <div className="flex items-center space-x-2">
    <button type="button" className={clsx(disabled ? 'cursor-not-allowed' : 'cursor-grab')}>
      <Icon kind="chevron_up_down" className="w-5" />
    </button>
    <TextField disabled={disabled} {...props} />
  </div>
);
