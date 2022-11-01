import * as Yup from 'yup';

import { CUISINES } from '@app/common/constants';

const cuisineOptions = CUISINES.map(cuisine => cuisine.value);

export interface CreateRecipeFormValues {
  name: string;
  description: string;
  cuisine: string;
  image: File | null;
  cookingTime: number;
  servingsCount: number;
  ingredients: { id: string; value: string }[];
  preparationSteps: { id: string; value: string }[];
}

export const initialValues: CreateRecipeFormValues = {
  name: '',
  description: '',
  cuisine: '',
  image: null,
  cookingTime: 30,
  servingsCount: 4,
  ingredients: [],
  preparationSteps: [],
};

export const validationSchema = Yup.object().shape({
  name: Yup.string().min(4, 'Name is too short').max(75, 'Name is too long').required('Name cannot be blank'),
  description: Yup.string().required('Description cannot be blank'),
  cuisine: Yup.string()
    .required('Select an option')
    .test('option', 'Select a valid option', value => !!value && cuisineOptions.includes(value)),
  image: Yup.mixed()
    .required('Image is required')
    .test('fileSize', 'Maximum image size is 1mb', (file: File | null) => !!file && file.size < 1000000),
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
