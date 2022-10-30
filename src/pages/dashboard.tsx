import { GetServerSideProps, NextPage } from 'next';
import { unstable_getServerSession } from 'next-auth';

import { Button, Container } from '@app/common/components';

import { authOptions } from './api/auth/[...nextauth]';

const DashboardPage: NextPage = () => {
  return (
    <Container>
      <div className="flex items-center">
        <h2>Dashboard</h2>

        <Button
          appearance="primary"
          className="ml-auto"
          link="/recipes/create"
          icon="plus"
          iconProps={{ className: 'w-5' }}
          iconPosition="left"
        >
          Recipe
        </Button>
      </div>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session) {
    return {
      props: {},
      redirect: {
        destination: '/',
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};

export default DashboardPage;
