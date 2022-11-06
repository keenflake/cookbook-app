import { FieldArray, Form, Formik } from 'formik';
import { Reorder } from 'framer-motion';
import { FC } from 'react';

import {
  Button,
  DraggableTextField,
  FieldError,
  FileField,
  SelectField,
  TextAreaField,
  TextField,
} from '@app/common/components';
import { CUISINES } from '@app/common/constants';
import { getRandomHex } from '@app/common/utils';

import { RecipeFormValues, defaultValues, validationSchema } from './utils';

export interface RecipeFormProps {
  className?: string;
  initialValues?: RecipeFormValues;
  disabled?: boolean;
  submitBtnLabel: string;
  onSubmit: (values: RecipeFormValues) => any;
}

export const RecipeForm: FC<RecipeFormProps> = ({ className, initialValues, disabled, submitBtnLabel, onSubmit }) => {
  return (
    <Formik initialValues={initialValues || defaultValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {({ values, touched, setFieldValue, setFieldTouched, getFieldMeta }) => {
        const isFormTouched = Object.values(touched).some(touched => touched);

        return (
          <Form className={className}>
            <h3>General Information</h3>

            <div className="flex md:block space-x-4 md:space-x-0 md:space-y-4">
              <div className="flex-1 space-y-4">
                <TextField
                  type="text"
                  label="Name"
                  id="name"
                  name="name"
                  placeholder="My awesome Key Lime Pie"
                  disabled={disabled}
                />
                <TextAreaField
                  label="Description"
                  id="description"
                  name="description"
                  placeholder="This is my lovely Key Lime Pie recipe"
                  rows={6}
                  className="resize-none"
                  disabled={disabled}
                />
                <SelectField
                  label="Cuisine"
                  name="cuisine"
                  id="cuisine"
                  placeholder="Select cuisine"
                  options={CUISINES}
                  disabled={disabled}
                />
              </div>

              <div className="flex-1 md:h-60">
                <FileField
                  label="Preview Image"
                  containerClassName="h-full"
                  className="!h-full"
                  id="image"
                  name="image"
                  accept="image/jpg, image/jpeg, image/png"
                  disabled={disabled}
                />
              </div>
            </div>

            <div className="flex md:block space-x-4 md:space-x-0 md:space-y-4 mt-4">
              <div className="flex-1">
                <TextField
                  type="number"
                  label="Cooking Time (minutes)"
                  id="cookingTime"
                  name="cookingTime"
                  placeholder="30"
                  disabled={disabled}
                />
              </div>

              <div className="flex-1">
                <TextField
                  type="number"
                  label="Servings"
                  id="servingsCount"
                  name="servingsCount"
                  placeholder="4"
                  disabled={disabled}
                />
              </div>
            </div>

            <hr className="my-10 bg-gray-200" />

            <h3>Ingredients</h3>

            <div>
              <FieldArray
                name="ingredients"
                render={arrayHelpers => {
                  const meta = getFieldMeta(arrayHelpers.name);

                  return (
                    <>
                      {values.ingredients.length > 0 ? (
                        <>
                          {disabled ? (
                            <ul className="space-y-4 mb-4">
                              {values.ingredients.map((ingredient, idx) => (
                                <li key={idx}>
                                  <DraggableTextField type="text" name={`ingredients.${idx}.value`} disabled />
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <Reorder.Group
                              axis="y"
                              className="space-y-4 mb-4"
                              values={values.ingredients}
                              onReorder={ingredients => {
                                setFieldValue('ingredients', ingredients);
                                setFieldTouched('ingredients', true);
                              }}
                            >
                              {values.ingredients.map((ingredient, idx) => (
                                <Reorder.Item key={ingredient.id} value={ingredient}>
                                  <DraggableTextField type="text" name={`ingredients.${idx}.value`} />
                                </Reorder.Item>
                              ))}
                            </Reorder.Group>
                          )}
                        </>
                      ) : (
                        <p className="my-4">Add ingredients by clicking button below</p>
                      )}

                      <div className="flex items-center">
                        <Button
                          type="button"
                          appearance="primary"
                          icon="plus"
                          iconProps={{ className: 'w-5' }}
                          disabled={disabled}
                          onClick={() => arrayHelpers.push({ id: getRandomHex(8), value: '' })}
                        >
                          Ingredient
                        </Button>

                        {meta.error && meta.touched && <FieldError className="!mt-0">{meta.error}</FieldError>}
                      </div>
                    </>
                  );
                }}
              />
            </div>

            <hr className="my-10 bg-gray-200" />

            <h3>Preparation Steps</h3>

            <div>
              <FieldArray
                name="preparationSteps"
                render={arrayHelpers => {
                  const meta = getFieldMeta(arrayHelpers.name);

                  return (
                    <>
                      {values.preparationSteps.length > 0 && (
                        <>
                          {disabled ? (
                            <ul className="space-y-4 mb-4">
                              {values.preparationSteps.map((step, idx) => (
                                <li key={idx}>
                                  <DraggableTextField type="text" name={`preparationSteps.${idx}.value`} disabled />
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <Reorder.Group
                              axis="y"
                              className="space-y-4 mb-4"
                              values={values.preparationSteps}
                              onReorder={preparationSteps => {
                                setFieldValue('preparationSteps', preparationSteps);
                                setFieldTouched('preparationSteps', true);
                              }}
                            >
                              {values.preparationSteps.map((step, idx) => (
                                <Reorder.Item key={step.id} value={step}>
                                  <DraggableTextField type="text" name={`preparationSteps.${idx}.value`} />
                                </Reorder.Item>
                              ))}
                            </Reorder.Group>
                          )}
                        </>
                      )}

                      <div className="flex items-center">
                        <Button
                          type="button"
                          appearance="primary"
                          icon="plus"
                          iconProps={{ className: 'w-5' }}
                          disabled={disabled}
                          onClick={() => arrayHelpers.push({ id: getRandomHex(8), value: '' })}
                        >
                          Preparation Step
                        </Button>

                        {meta.error && meta.touched && <FieldError className="!mt-0">{meta.error}</FieldError>}
                      </div>
                    </>
                  );
                }}
              />
            </div>

            <hr className="my-10 bg-gray-200" />

            <div className="flex justify-end">
              <Button type="submit" appearance="primary" size="lg" disabled={!isFormTouched || disabled}>
                {submitBtnLabel}
              </Button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};
