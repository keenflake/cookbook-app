import { FC, PropsWithChildren } from 'react';

import { Footer } from '@app/components/Footer';
import { Header } from '@app/components/Header';

export interface LayoutProps extends PropsWithChildren {}

export const Layout: FC<LayoutProps> = ({ children }) => (
  <>
    <Header className="flex-shrink-0" />
    <main className="flex-1 mt-16">{children}</main>
    <Footer className="flex-shrink-0" />
  </>
);
