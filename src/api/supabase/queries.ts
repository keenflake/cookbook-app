import { FavoriteRecipe, Recipe } from '@app/common/models';

import { supabase } from './client';

export const getAllRecipes = async (): Promise<Recipe[]> => {
  const response = await supabase.from('recipes').select('*').order('created_at', { ascending: false });

  return response.data || [];
};

export const getUserRecipes = async (userId: string): Promise<Recipe[]> => {
  const response = await supabase.from('recipes').select('*').eq('userId', userId);

  return response.data || [];
};

export const getUserFavoriteRecipes = async (userId: string): Promise<FavoriteRecipe[]> => {
  const response = await supabase
    .from('favorites')
    .select(
      `
        *,
        recipes (
          *
        )
      `,
    )
    .eq('userId', userId);

  return response.data || [];
};

export const getRecipe = async (recipeId: string): Promise<Recipe | null> => {
  const response = await supabase.from('recipes').select('*').eq('id', recipeId).limit(1);

  return response.data?.at(0) || null;
};

export const isRecipeFavorite = async (userId: string, recipeId: string): Promise<boolean> => {
  const response = await supabase.from('favorites').select('*').eq('userId', userId).eq('recipeId', recipeId);

  return !!response.data && response.data.length === 1;
};
