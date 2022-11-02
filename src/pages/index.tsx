import { GetServerSideProps, NextPage } from 'next';
import { unstable_getServerSession } from 'next-auth';

import { getAllRecipes } from '@app/api/supabase/queries';
import { Container, RecipeCard } from '@app/common/components';
import { Recipe } from '@app/common/models';

import { authOptions } from './api/auth/[...nextauth]';

interface IndexPageProps {
  recipes: Recipe[];
}

const IndexPage: NextPage<IndexPageProps> = ({ recipes }) => {
  return (
    <Container className="mb-12">
      <h2>Latest</h2>

      {recipes.length > 0 && (
        <ul className="grid grid-cols-2 gap-x-4 gap-y-3">
          {recipes.map(recipe => (
            <li key={recipe.id}>
              <RecipeCard recipe={recipe} />
            </li>
          ))}
        </ul>
      )}
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const recipes$ = getAllRecipes();
  const session$ = unstable_getServerSession(req, res, authOptions);

  const [recipes, session] = await Promise.all([recipes$, session$]);

  return {
    props: {
      session,
      recipes,
    },
  };
};

export default IndexPage;
