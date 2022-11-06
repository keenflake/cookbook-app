import clsx from 'clsx';
import Link from 'next/link';
import { ComponentPropsWithoutRef, FC, MouseEventHandler, useCallback } from 'react';

import { Card, IconButton, Image } from '@app/common/components';
import { Recipe } from '@app/common/models';

import styles from './RecipeCard.module.css';

type Props = ComponentPropsWithoutRef<'article'>;

export interface RecipeCardProps extends Props {
  recipe: Recipe;
  transitions?: boolean;
  showDeleteBtn?: boolean;
  showEditBtn?: boolean;
  onDelete?: (recipe: Recipe) => void;
  onEdit?: (recipe: Recipe) => void;
}

export const RecipeCard: FC<RecipeCardProps> = ({
  recipe,
  transitions = false,
  showDeleteBtn = false,
  showEditBtn = false,
  onDelete,
  onEdit,
  ...props
}) => {
  const handleEditClick = useCallback(() => {
    if (onEdit) {
      onEdit(recipe);
    }
  }, [onEdit, recipe]);

  const handleDeleteClick = useCallback(() => {
    if (onDelete) {
      onDelete(recipe);
    }
  }, [onDelete, recipe]);

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
            <p className="line-clamp-4">{recipe.description}</p>

            <hr className="my-4" />

            <div className="flex items-center justify-between">
              <ul className="flex space-x-2">
                <li className="px-3 py-2 bg-emerald-600 rounded-full font-medium text-xs text-white leading-none">
                  {recipe.cuisine}
                </li>
                <li className="px-3 py-2 bg-sky-600 rounded-full font-medium text-xs text-white leading-none">
                  {recipe.cookingTime} mins
                </li>
              </ul>

              {(showDeleteBtn || showEditBtn) && (
                <div
                  className="flex space-x-2"
                  onClick={e => {
                    e.preventDefault();
                    e.stopPropagation();
                    e.nativeEvent.stopImmediatePropagation();
                  }}
                >
                  {showEditBtn && (
                    <IconButton icon="pencil" iconProps={{ className: 'w-5 h-5' }} onClick={handleEditClick} />
                  )}
                  {showDeleteBtn && (
                    <IconButton icon="trash" iconProps={{ className: 'w-5 h-5' }} onClick={handleDeleteClick} />
                  )}
                </div>
              )}
            </div>
          </div>
        </Card>
      </article>
    </Link>
  );
};
