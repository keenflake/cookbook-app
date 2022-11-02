import { Form, Formik } from 'formik';
import { GetServerSideProps, NextPage } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { useCallback, useState } from 'react';

import { getAllRecipes } from '@app/api/supabase/queries';
import { Button, Container, RecipeCard, TextField } from '@app/common/components';
import { Recipe } from '@app/common/models';

import { authOptions } from './api/auth/[...nextauth]';

interface IndexPageProps {
  recipes: Recipe[];
}

interface SearchValues {
  query: string;
}

const searchInitialValue: SearchValues = {
  query: '',
};

const IndexPage: NextPage<IndexPageProps> = ({ recipes: initialRecipes }) => {
  const [filteredRecipes, setFilteredRecipes] = useState(initialRecipes);

  const handleSubmit = useCallback(
    (values: SearchValues) => {
      setFilteredRecipes(() => {
        if (!values.query) {
          return initialRecipes;
        }

        const query = values.query.toLowerCase();

        return initialRecipes.filter(
          recipe =>
            recipe.name.toLowerCase().includes(query) ||
            recipe.description.toLowerCase().includes(query) ||
            recipe.cuisine.toLowerCase().includes(query),
        );
      });
    },
    [initialRecipes],
  );

  return (
    <Container className="mb-12">
      <h2>Latest</h2>

      {initialRecipes.length > 0 ? (
        <>
          <Formik initialValues={searchInitialValue} onSubmit={handleSubmit}>
            <Form className="flex space-x-4 mb-6">
              <TextField
                name="query"
                id="query"
                placeholder="Lasagna Bolognese"
                onChange={(...values) => console.log(values)}
              />
              <Button type="submit" appearance="primary" className="px-8">
                Search
              </Button>
            </Form>
          </Formik>

          <ul className="grid grid-cols-2 gap-x-4 gap-y-3">
            {filteredRecipes.map(recipe => (
              <li key={recipe.id}>
                <RecipeCard recipe={recipe} />
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>No recipes found</p>
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
