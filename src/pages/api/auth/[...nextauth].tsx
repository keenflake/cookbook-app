import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import { assert } from '@app/utils/assert';

assert(typeof process.env.GOOGLE_CLIENT_ID === 'string', `"GOOGLE_CLIENT_ID" env is not set`);
assert(typeof process.env.GOOGLE_CLIENT_SECRET === 'string', `"GOOGLE_CLIENT_SECRET" env is not set`);

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({ clientId: process.env.GOOGLE_CLIENT_ID, clientSecret: process.env.GOOGLE_CLIENT_SECRET }),
  ],
};

export default NextAuth(authOptions);
