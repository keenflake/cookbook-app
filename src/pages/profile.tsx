import { GetServerSideProps, NextPage } from 'next';
import { unstable_getServerSession } from 'next-auth';
import Head from 'next/head';

import { Container } from '@app/common/components';
import { ProfileCard } from '@app/components/ProfileCard';

import { authOptions } from './api/auth/[...nextauth]';

const ProfilePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Cookbook – Profile</title>
      </Head>

      <Container>
        <h2>Profile</h2>
        <ProfileCard />
      </Container>
    </>
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

export default ProfilePage;
