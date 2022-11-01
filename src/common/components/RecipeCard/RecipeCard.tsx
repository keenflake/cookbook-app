import clsx from 'clsx';
import Link from 'next/link';
import { ComponentPropsWithoutRef, FC } from 'react';

import { Card, Image } from '@app/common/components';
import { Recipe } from '@app/common/models';

import styles from './RecipeCard.module.css';

type Props = ComponentPropsWithoutRef<'article'>;

export interface RecipeCardProps extends Props {
  recipe: Recipe;
  transitions?: boolean;
}

export const RecipeCard: FC<RecipeCardProps> = ({ recipe, transitions = false, ...props }) => {
  return (
    <Link href={`/recipes/${recipe.id}`} target="_blank" className="block">
      <article {...props}>
        <Card className={clsx('p-0', 'overflow-hidden', transitions && styles.transitions)}>
          <div className="h-60 relative">
            <figure>
              <Image src={recipe.image} alt={`${recipe.name} photo`} fill className="object-cover object-center" />
              <figcaption className="absolute bottom-4 left-4 z-10 text-2xl text-white">{recipe.name}</figcaption>
            </figure>

            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/75" />
          </div>

          <div className="p-4">
            <p>{recipe.description}</p>

            <hr className="my-4" />

            <ul className="flex space-x-2">
              <li className="px-3 py-2 bg-emerald-500 rounded-full font-medium text-xs text-white leading-none">
                {recipe.cuisine}
              </li>
              <li className="px-3 py-2 bg-sky-500 rounded-full font-medium text-xs text-white leading-none">
                {recipe.cookingTime} mins
              </li>
            </ul>
          </div>
        </Card>
      </article>
    </Link>
  );
};
