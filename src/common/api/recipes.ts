import { useCallback } from 'react';

import { BlankRecipe, Recipe } from '@app/common/models';

export interface RecipesMutations {
  create: (recipe: BlankRecipe) => Promise<Recipe>;
}

export const useRecipesMutations = (): RecipesMutations => {
  const create = useCallback(async (recipe: BlankRecipe): Promise<Recipe> => {
    const res = await fetch('/api/recipes', { method: 'POST', body: JSON.stringify(recipe) });

    if (!res.ok) {
      throw new Error(`Error during recipe creation, code is: ${res.status}`);
    }

    const data: Recipe = await res.json();

    return data;
  }, []);

  return { create };
};
