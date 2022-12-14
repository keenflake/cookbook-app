import { GetServerSideProps, NextPage } from 'next';
import { unstable_getServerSession } from 'next-auth';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';

import { getUserRecipes } from '@app/api/supabase';
import { useRecipesMutations } from '@app/common/api';
import { Button, Container, RecipeCard } from '@app/common/components';
import { Recipe } from '@app/common/models';

import { authOptions } from './api/auth/[...nextauth]';

interface DashboardPageProps {
  recipes: Recipe[];
}

const DashboardPage: NextPage<DashboardPageProps> = ({ recipes: initialRecipes }) => {
  const router = useRouter();

  const [recipes, setRecipes] = useState(initialRecipes);
  const [deletionInProgress, setDeletionInProgress] = useState(false);

  const { remove } = useRecipesMutations();

  const handleEdit = useCallback(
    (recipe: Recipe) => {
      router.push(`/recipes/${recipe.id}/edit`);
    },
    [router],
  );

  const handleDelete = useCallback(
    async (recipeToDelete: Recipe) => {
      if (deletionInProgress) {
        return;
      }

      setDeletionInProgress(true);

      await remove(recipeToDelete.id);

      setDeletionInProgress(false);
      setRecipes(recipes => recipes.filter(recipe => recipe.id !== recipeToDelete.id));
    },
    [deletionInProgress, remove],
  );

  return (
    <>
      <Head>
        <title>Cookbook – Dashboard</title>
      </Head>

      <Container className="mb-12">
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

        {recipes.length > 0 && (
          <ul className="grid grid-cols-2 md:grid-cols-1 gap-x-4 gap-y-3">
            {recipes.map(recipe => (
              <li key={recipe.id}>
                <RecipeCard
                  recipe={recipe}
                  transitions
                  showDeleteBtn
                  showEditBtn
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                />
              </li>
            ))}
          </ul>
        )}
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

  const recipes = await getUserRecipes(session.user.id);

  return {
    props: {
      session,
      recipes,
    },
  };
};

export default DashboardPage;
