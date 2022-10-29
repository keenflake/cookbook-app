import { SessionProvider } from 'next-auth/react';
import { AppProps } from 'next/app';
import { FC } from 'react';

import { Layout } from '@app/components/Layout';
import '@app/styles/main.css';

const App: FC<AppProps> = ({ Component, pageProps: { session, ...pageProps } }) => (
  <SessionProvider session={session}>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </SessionProvider>
);

export default App;
