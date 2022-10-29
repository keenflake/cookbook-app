import { signOut, useSession } from 'next-auth/react';
import { FC, useCallback } from 'react';

import { Button, Card, Image } from '@app/common/components';

export interface ProfileCardProps {}

export const ProfileCard: FC<ProfileCardProps> = () => {
  const { data: session } = useSession();

  const handleSignOutClick = useCallback(() => {
    signOut();
  }, []);

  if (!session) {
    return null;
  }

  return (
    <Card className="flex flex-wrap sm:flex-col items-center sm:items-start">
      <div className="flex items-center">
        {session.user.image && (
          <Image
            referrerPolicy="no-referrer"
            src={session.user.image}
            width={48}
            height={48}
            alt={`${session.user.name} photo`}
            className="mr-4 rounded-full"
          />
        )}
        <div>
          {session.user.name && <p className="mr-2">{session.user.name}</p>}
          {session.user.email && <p className="font-medium text-xs text-gray-500">{session.user.email}</p>}
        </div>
      </div>

      <Button appearance="primary" className="ml-auto sm:ml-0 sm:mt-4" onClick={handleSignOutClick}>
        Sign Out
      </Button>
    </Card>
  );
};
