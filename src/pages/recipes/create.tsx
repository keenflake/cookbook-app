import { GetServerSideProps, NextPage } from 'next';
import { unstable_getServerSession } from 'next-auth';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';

import { useRecipesMutations } from '@app/common/api';
import { Button, Container } from '@app/common/components';
import { BlankRecipe } from '@app/common/models';
import { CreateRecipeForm } from '@app/components/CreateRecipeForm';

import { authOptions } from '../api/auth/[...nextauth]';

const CreateRecipePage: NextPage = () => {
  const [isUIBlocked, setIsUIBlocked] = useState(false);

  const router = useRouter();

  const { create } = useRecipesMutations();

  const handleSubmit = useCallback(
    async (recipe: BlankRecipe) => {
      setIsUIBlocked(true);

      try {
        const createdRecipe = await create(recipe);

        router.push(`/recipes/${createdRecipe.id}`);
      } catch (err) {
        console.log('Error during recipe creation', err);

        setIsUIBlocked(false);
      }
    },
    [create, router],
  );

  return (
    <>
      <Head>
        <title>Cookbook – Create a Recipe</title>
      </Head>

      <Container>
        <div className="flex items-center justify-between mt-10 mb-8">
          <h2 className="m-0">New Recipe</h2>

          <Button appearance="secondary" icon="back" iconProps={{ className: 'w-5' }} link="/dashboard">
            Back
          </Button>
        </div>

        <CreateRecipeForm className="mb-10" disabled={isUIBlocked} onSubmit={handleSubmit} />
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

export default CreateRecipePage;
