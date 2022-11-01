import { Recipe } from '@app/common/models';

import { supabase } from './client';

export const getUserRecipes = async (userId: string): Promise<Recipe[]> => {
  const response = await supabase.from('recipes').select('*').eq('userId', userId);

  return response.data || [];
};

export const getRecipe = async (recipeId: string): Promise<Recipe | null> => {
  const response = await supabase.from('recipes').select('*').eq('id', recipeId).limit(1);

  return response.data?.at(0) || null;
};
