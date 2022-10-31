export interface BlankRecipe {
  name: string;
  description: string;
  image: File | null;
  cookingTime: number;
  servingsCount: number;
  ingredients: string[];
  preparationSteps: string[];
}

export interface Recipe extends Omit<BlankRecipe, 'image'> {
  id: string;
  userId: string;
  image: string;
}
