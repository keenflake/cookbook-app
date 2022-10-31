import clsx from 'clsx';
import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { ComponentProps, FC, useCallback } from 'react';

import { Button, Container, Dropdown, Image } from '@app/common/components';

export interface HeaderProps {}

export const Header: FC<HeaderProps> = () => {
  const { data: session } = useSession();

  return (
    <header className="h-16 sticky top-0 z-10 bg-white/20 backdrop-blur-md border-b border-b-gray-200">
      <Container className="flex items-center h-full">
        <Link href="/" className="font-cursive text-2xl leading-none antialiased transition-opacity hover:opacity-80">
          Cookbook
        </Link>

        <nav className="flex items-center space-x-4 ml-auto">
          {session ? <AuthorizedControls /> : <UnauthorizedControls />}
        </nav>
      </Container>
    </header>
  );
};

const StyledLink: FC<ComponentProps<typeof Link>> = ({ className, ...props }) => (
  <Link
    {...props}
    className={clsx(className, 'font-medium', 'leading-none', 'transition-opacity', 'hover:opacity-80')}
  />
);

const UnauthorizedControls: FC = () => {
  const handleSignInClick = useCallback(() => {
    signIn('google');
  }, []);

  return (
    <Button
      appearance="primary"
      size="md"
      icon="google"
      iconProps={{ className: 'w-5 p-1 bg-white rounded-full' }}
      iconPosition="right"
      onClick={handleSignInClick}
    >
      Sign In with
    </Button>
  );
};

const AuthorizedControls: FC = () => {
  const { data: session } = useSession();

  const handleSignOutClick = useCallback(() => {
    signOut();
  }, []);

  if (session?.user.image) {
    return (
      <>
        <StyledLink href="/">Recipes</StyledLink>
        <StyledLink href="/dashboard">Dashboard</StyledLink>
        <StyledLink href="/favorites">Favorites</StyledLink>
        <Dropdown
          className="w-8 h-8"
          panelClassName="w-32"
          placement="bottom-end"
          trigger={
            <Image
              src={session.user.image}
              width={32}
              height={32}
              alt={`${session.user.name} photo`}
              className="rounded-full"
              referrerPolicy="no-referrer"
            />
          }
        >
          <ul className="flex flex-col space-y-2">
            <li>
              <Link href="/profile" className="block w-full px-3 py-2 rounded-md hover:bg-gray-200 font-medium">
                Profile
              </Link>
            </li>
            <li>
              <button
                className="block w-full px-3 py-2 rounded-md hover:bg-gray-200 font-medium text-left"
                onClick={handleSignOutClick}
              >
                Sign Out
              </button>
            </li>
          </ul>
        </Dropdown>
      </>
    );
  }

  return null;
};
