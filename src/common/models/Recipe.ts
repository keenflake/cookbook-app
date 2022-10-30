export interface BlankRecipe {
  name: string;
  description: string;
  cookingTime: number;
  servingsCount: number;
  ingredients: string[];
  preparationSteps: string[];
}

export interface Recipe extends BlankRecipe {
  id: string;
  userId: string;
}
