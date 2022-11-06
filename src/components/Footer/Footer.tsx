import clsx from 'clsx';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { ComponentPropsWithoutRef, FC } from 'react';

import { Container, Icon } from '@app/common/components';

type Props = ComponentPropsWithoutRef<'footer'>;

export interface FooterProps extends Props {}

export const Footer: FC<FooterProps> = ({ className, ...props }) => {
  const { data: session } = useSession();

  return (
    <footer className={clsx('py-10', 'bg-gray-800', 'text-white', className)} {...props}>
      <Container>
        <p className="flex items-center justify-between">
          <Link href="/" className="font-cursive text-2xl leading-none antialiased transition-opacity hover:opacity-80">
            Cookbook
          </Link>

          <a
            href="https://github.com/keenflake/cookbook-app"
            target="_blank"
            rel="noreferrer"
            className="transition-opacity hover:opacity-80"
          >
            <Icon kind="github" className="w-8" />
            <span className="sr-only">GitHub Repository</span>
          </a>
        </p>

        <hr className="max-w-[48px] mt-4 mb-8 border-t-2 border-t-white" />

        {session && (
          <nav className="flex flex-col space-y-2">
            <Link href="/" className="font-medium">
              Recipes
            </Link>
            <Link href="/dashboard" className="font-medium">
              Dashboard
            </Link>
            <Link href="/favorites" className="font-medium">
              Favorites
            </Link>
          </nav>
        )}
      </Container>
    </footer>
  );
};
