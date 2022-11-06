import { GetServerSideProps, NextPage } from 'next';
import { unstable_getServerSession } from 'next-auth';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';

import { useRecipesMutations } from '@app/common/api';
import { Button, Container, RecipeForm, RecipeFormValues } from '@app/common/components';
import { BlankRecipe } from '@app/common/models';

import { authOptions } from '../api/auth/[...nextauth]';

const CreateRecipePage: NextPage = () => {
  const [isUIBlocked, setIsUIBlocked] = useState(false);

  const router = useRouter();

  const { create } = useRecipesMutations();

  const handleSubmit = useCallback(
    async (values: RecipeFormValues) => {
      if (isUIBlocked) {
        return;
      }

      const { image, ingredients, preparationSteps, ...partialRecipe } = values;

      const recipe: BlankRecipe = {
        ...partialRecipe,
        image: typeof image !== 'string' ? image : null,
        ingredients: ingredients.map(ingredient => ingredient.value),
        preparationSteps: preparationSteps.map(step => step.value),
      };

      setIsUIBlocked(true);

      try {
        const createdRecipe = await create(recipe);

        router.push(`/recipes/${createdRecipe.id}`);
      } catch (err) {
        console.log('Error during recipe creation', err);

        setIsUIBlocked(false);
      }
    },
    [isUIBlocked, create, router],
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

        <RecipeForm className="mb-10" disabled={isUIBlocked} submitBtnLabel="Create a Recipe" onSubmit={handleSubmit} />
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
