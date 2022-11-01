import { GetServerSideProps, NextPage } from 'next';
import { unstable_getServerSession } from 'next-auth';

import { getRecipe } from '@app/api/supabase/queries';
import { Container, FavoriteButton, Icon, IconButton, Image } from '@app/common/components';
import { CUISINES } from '@app/common/constants';
import { Recipe } from '@app/common/models';

import { authOptions } from '../api/auth/[...nextauth]';

interface RecipeDetailsPageProps {
  recipe: Recipe;
}

const getCuisineLabel = (name: string): string => CUISINES.find(cuisine => cuisine.value === name)?.label!;

const RecipeDetailsPage: NextPage<RecipeDetailsPageProps> = ({ recipe }) => {
  return (
    <Container className="my-12">
      <div className="h-80 relative rounded-md overflow-hidden">
        <figure>
          <Image src={recipe.image} alt={`${recipe.name} photo`} fill className="object-cover object-center" />
          <figcaption className="absolute bottom-6 left-8 z-10 text-3xl text-white font-medium">
            {recipe.name}
          </figcaption>
        </figure>

        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/75" />
      </div>

      <div className="p-8">
        <div className="flex justify-between">
          <ul className="flex space-x-8">
            <li className="flex items-center space-x-1">
              <Icon kind="clock" className="w-5" />
              <span>{recipe.cookingTime} mins</span>
            </li>
            <li className="flex items-center space-x-1">
              <Icon kind="tag" className="w-5" />
              <span>{getCuisineLabel(recipe.cuisine)}</span>
            </li>
          </ul>

          <FavoriteButton type="button" />
        </div>

        <hr className="mt-8" />

        <div className="flex space-x-8">
          <div className="flex-[3]">
            <h3>About this recipe</h3>

            <p>{recipe.description}</p>
          </div>

          <div className="flex-[2]">
            <h3>Ingredients</h3>

            <ol className="space-y-2">
              {recipe.ingredients.map(ingredient => (
                <li key={ingredient} className="flex items-center space-x-2">
                  <span className="w-[6px] h-[6px] bg-emerald-500"></span>
                  <span>{ingredient}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <h3>Preparation steps</h3>

        <ol className="space-y-4">
          {recipe.preparationSteps.map((step, idx) => (
            <li key={step} className="flex items-center space-x-4 px-6 py-4 bg-gray-100 rounded-lg font-medium">
              <span className="flex items-center justify-center w-8 h-8 bg-emerald-500 rounded-full text-xs text-white leading-none">
                {idx + 1}
              </span>

              <p>{step}</p>
            </li>
          ))}
        </ol>
      </div>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res, params }) => {
  if (!params?.id) {
    return {
      props: {},
      redirect: '/',
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

  return {
    props: {
      session,
      recipe,
    },
  };
};

export default RecipeDetailsPage;
