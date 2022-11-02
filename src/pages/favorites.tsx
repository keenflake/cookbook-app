import { GetServerSideProps, NextPage } from 'next';
import { unstable_getServerSession } from 'next-auth';

import { getUserFavoriteRecipes } from '@app/api/supabase/queries';
import { Container, RecipeCard } from '@app/common/components';
import { FavoriteRecipe } from '@app/common/models';

import { authOptions } from './api/auth/[...nextauth]';

interface FavoritesPageProps {
  favoriteRecipes: FavoriteRecipe[];
}

const FavoritesPage: NextPage<FavoritesPageProps> = ({ favoriteRecipes }) => {
  console.log(favoriteRecipes);

  return (
    <Container className="mb-12">
      <h2>Favorites</h2>

      {favoriteRecipes.length > 0 ? (
        <ul className="grid grid-cols-2 gap-x-4 gap-y-3">
          {favoriteRecipes.map(favoriteRecipe => (
            <li key={favoriteRecipe.recipes.id}>
              <RecipeCard recipe={favoriteRecipe.recipes} />
            </li>
          ))}
        </ul>
      ) : (
        <p>No favorite recipes found, time to add one!</p>
      )}
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

  const favoriteRecipes = await getUserFavoriteRecipes(session.user.id);

  return {
    props: {
      session,
      favoriteRecipes,
    },
  };
};

export default FavoritesPage;
