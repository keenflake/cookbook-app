import { SessionProvider } from 'next-auth/react';
import { AppProps } from 'next/app';
import { FC } from 'react';

import '@app/styles/main.css';

const App: FC<AppProps> = ({ Component, pageProps: { session, ...pageProps } }) => (
  <SessionProvider session={session}>
    <Component {...pageProps} />
  </SessionProvider>
);

export default App;
