import { Popover } from '@headlessui/react';
import clsx from 'clsx';
import { FC, PropsWithChildren, ReactNode, useState } from 'react';
import { PopperProps, usePopper } from 'react-popper';

export interface DropdownProps extends PropsWithChildren {
  className?: string;
  placement?: PopperProps<any>['placement'];
  trigger: ReactNode;
  panelClassName?: string;
}

export const Dropdown: FC<DropdownProps> = ({ placement = 'auto', className, trigger, panelClassName, children }) => {
  const [referenceElement, setReferenceElement] = useState<HTMLButtonElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);

  const { styles, attributes } = usePopper(referenceElement, popperElement, { placement });

  return (
    <Popover className={className}>
      <Popover.Button ref={setReferenceElement}>{trigger}</Popover.Button>
      <Popover.Panel
        ref={setPopperElement}
        style={styles.popper}
        {...attributes.popper}
        className={clsx('bg-white', 'p-2', 'shadow-lg', 'rounded-lg', panelClassName)}
      >
        {children}
      </Popover.Panel>
    </Popover>
  );
};
