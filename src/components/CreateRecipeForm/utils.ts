import * as Yup from 'yup';

export interface CreateRecipeFormValues {
  name: string;
  description: string;
  cookingTime: number;
  servingsCount: number;
  ingredients: { id: string; value: string }[];
  preparationSteps: { id: string; value: string }[];
}

export const initialValues: CreateRecipeFormValues = {
  name: '',
  description: '',
  cookingTime: 30,
  servingsCount: 4,
  ingredients: [],
  preparationSteps: [],
};

export const validationSchema = Yup.object().shape({
  name: Yup.string().min(4, 'Name is too short').max(75, 'Name is too long').required('Name cannot be blank'),
  description: Yup.string().required('Description cannot be blank'),
  cookingTime: Yup.number()
    .min(1, 'Cooking time cannot be less than 1 minute')
    .required('Cooking time cannot be blank'),
  servingsCount: Yup.number().min(1, 'Servings cannot be less than 1').required('Servings cannot be blank'),
  ingredients: Yup.array()
    .min(1, 'A recipe cannot have less than 1 ingredient')
    .required('Ingredients cannot be empty'),
  preparationSteps: Yup.array()
    .min(1, 'A recipe cannot have less than 1 preparation step')
    .required('Preparation steps cannot be empty'),
});
