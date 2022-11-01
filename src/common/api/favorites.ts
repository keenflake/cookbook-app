import { useCallback } from 'react';

import { Recipe } from '@app/common/models';

export interface FavoritesMutations {
  create: (recipe: Recipe) => Promise<void>;
  remove: (recipe: Recipe) => Promise<void>;
}

export const useFavoritesMutations = (): FavoritesMutations => {
  const create = useCallback(async (recipe: Recipe) => {
    const payload = {
      recipeId: recipe.id,
    };

    const res = await fetch('/api/favorites', { method: 'POST', body: JSON.stringify(payload) });

    if (!res.ok) {
      throw new Error(`Error during making a recipe favorite, code is: ${res.status}`);
    }
  }, []);

  const remove = useCallback(async (recipe: Recipe) => {
    const res = await fetch(`/api/favorites/${recipe.id}`, { method: 'DELETE' });

    if (!res.ok) {
      throw new Error(`Error during favorite recipe deletion, code is: ${res.status}`);
    }
  }, []);

  return { create, remove };
};
