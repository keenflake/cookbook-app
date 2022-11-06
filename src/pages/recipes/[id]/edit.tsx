import { GetServerSideProps, NextPage } from 'next';
import { unstable_getServerSession } from 'next-auth';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';

import { getRecipe } from '@app/api/supabase/queries';
import { useRecipesMutations } from '@app/common/api';
import { Button, Container, RecipeForm, RecipeFormValues } from '@app/common/components';
import { BlankRecipe, Recipe } from '@app/common/models';
import { getRandomHex } from '@app/common/utils';

import { authOptions } from '../../api/auth/[...nextauth]';

interface EditRecipePageProps {
  recipe: Recipe;
}

const recipeToFormValues = (recipe: Recipe): RecipeFormValues => {
  return {
    ...recipe,
    ingredients: recipe.ingredients.map(ingredient => ({ id: getRandomHex(8), value: ingredient })),
    preparationSteps: recipe.preparationSteps.map(step => ({ id: getRandomHex(8), value: step })),
  };
};

const EditRecipePage: NextPage<EditRecipePageProps> = ({ recipe: initialRecipe }) => {
  const router = useRouter();

  const { edit } = useRecipesMutations();

  const [isUIBlocked, setIsUIBlocked] = useState(false);

  const handleSubmit = useCallback(
    async (values: RecipeFormValues) => {
      if (isUIBlocked) {
        return;
      }

      setIsUIBlocked(true);

      const { image, ingredients, preparationSteps, ...partialRecipe } = values;

      const recipe: BlankRecipe = {
        ...partialRecipe,
        image: typeof image === 'string' ? null : image,
        ingredients: ingredients.map(ingredient => ingredient.value),
        preparationSteps: preparationSteps.map(step => step.value),
      };

      try {
        const updatedRecipe = await edit(initialRecipe.id, recipe);

        router.push(`/recipes/${updatedRecipe.id}`);
      } catch (err) {
        console.log(err);

        setIsUIBlocked(false);
      }
    },
    [isUIBlocked, edit, initialRecipe, router],
  );

  return (
    <>
      <Head>
        <title>Cookbook – {initialRecipe.name} edit form</title>
      </Head>

      <Container className="mb-10">
        <div className="flex items-center justify-between">
          <h2>{initialRecipe.name}</h2>
          <Button appearance="secondary" link="/dashboard" icon="back" iconProps={{ className: 'w-5 h-5' }}>
            Back
          </Button>
        </div>

        <RecipeForm
          initialValues={recipeToFormValues(initialRecipe)}
          disabled={isUIBlocked}
          submitBtnLabel="Edit a Recipe"
          onSubmit={handleSubmit}
        />
      </Container>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res, params }) => {
  if (!params?.id) {
    return {
      props: {},
      notFound: true,
    };
  }

  const recipe$ = getRecipe(typeof params.id === 'string' ? params.id : params.id.at(0)!);
  const session$ = unstable_getServerSession(req, res, authOptions);

  const [recipe, session] = await Promise.all([recipe$, session$]);

  if (!recipe) {
    return {
      props: {},
      notFound: true,
    };
  }

  if (recipe.userId !== session?.user.id) {
    return {
      props: {},
      redirect: {
        destination: '/',
      },
    };
  }

  return {
    props: { recipe, session },
  };
};

export default EditRecipePage;
