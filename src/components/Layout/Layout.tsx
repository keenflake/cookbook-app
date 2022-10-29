import { FC, PropsWithChildren } from 'react';

import { Header } from '@app/components/Header';

export interface LayoutProps extends PropsWithChildren {}

export const Layout: FC<LayoutProps> = ({ children }) => (
  <>
    <Header />
    <main>{children}</main>
  </>
);
