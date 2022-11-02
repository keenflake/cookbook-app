import { Recipe } from './Recipe';

export interface FavoriteRecipe {
  id: string;
  created_at: string;
  recipeId: string;
  userId: string;
  recipes: Recipe;
}
