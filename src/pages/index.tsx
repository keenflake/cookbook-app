import { GetServerSideProps, NextPage } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { signIn, signOut, useSession } from 'next-auth/react';

import { authOptions } from './api/auth/[...nextauth]';

const IndexPage: NextPage = () => {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="p-4 bg-green-300 text-gray-700">
        <p>Signed in as {session.user?.email}</p>
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    );
  }

  return (
    <div className="p-4 bg-red-300 text-gray-700">
      <p>Not signed in</p>
      <button onClick={() => signIn('google')}>Sign in</button>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  return {
    props: {
      session: await unstable_getServerSession(req, res, authOptions),
    },
  };
};

export default IndexPage;
