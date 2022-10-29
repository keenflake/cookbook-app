import { ComponentPropsWithoutRef, ComponentType } from 'react';

export type SVGProps = Omit<ComponentPropsWithoutRef<'svg'>, 'viewBox'>;

export type SVGComponent = ComponentType<SVGProps>;
