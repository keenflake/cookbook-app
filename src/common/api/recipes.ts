import { useCallback } from 'react';

import { BlankRecipe, Recipe } from '@app/common/models';

export interface RecipesMutations {
  create: (recipe: BlankRecipe) => Promise<Recipe>;
}

const blankRecipeToFormData = (recipe: BlankRecipe): FormData => {
  const data = new FormData();

  data.append('name', recipe.name);
  data.append('description', recipe.description);
  data.append('cookingTime', recipe.cookingTime.toString());
  data.append('servingsCount', recipe.servingsCount.toString());
  data.append('ingredients', JSON.stringify(recipe.ingredients));
  data.append('preparationSteps', JSON.stringify(recipe.preparationSteps));

  if (recipe.image) {
    data.append('image', recipe.image);
  }

  return data;
};

export const useRecipesMutations = (): RecipesMutations => {
  const create = useCallback(async (blankRecipe: BlankRecipe): Promise<Recipe> => {
    const data = blankRecipeToFormData(blankRecipe);

    const res = await fetch('/api/recipes', { method: 'POST', body: data });

    if (!res.ok) {
      throw new Error(`Error during recipe creation, code is: ${res.status}`);
    }

    const recipe: Recipe = await res.json();

    return recipe;
  }, []);

  return { create };
};
