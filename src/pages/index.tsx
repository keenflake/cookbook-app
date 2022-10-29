import { GetServerSideProps, NextPage } from 'next';
import { unstable_getServerSession } from 'next-auth';

import { authOptions } from './api/auth/[...nextauth]';

const IndexPage: NextPage = () => {
  return <p>Index page</p>;
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  return {
    props: {
      session: await unstable_getServerSession(req, res, authOptions),
    },
  };
};

export default IndexPage;
