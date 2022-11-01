import { Recipe } from '@app/common/models';

import { supabase } from './client';

export const getUserRecipes = async (userId: string): Promise<Recipe[]> => {
  const response = await supabase.from('recipes').select('*').eq('userId', userId);

  return response.data || [];
};
