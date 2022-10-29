import NextImage from 'next/image';
import { ComponentPropsWithoutRef, FC } from 'react';

import { loader } from './loader';

type Props = Omit<ComponentPropsWithoutRef<typeof NextImage>, 'loader'>;

export interface ImageProps extends Props {}

export const Image: FC<Props> = props => <NextImage loader={loader} {...props} />;
