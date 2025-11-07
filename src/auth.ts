import NextAuth from 'next-auth';
import { authConfig } from './auth.config';

export const { 
  auth,
  handlers, 
  signIn,
  signOut
} = NextAuth({
  ...authConfig,
  // Additional config can be added here
});

export type { Session } from 'next-auth';

export const getServerSession = async () => {
  const session = await auth();
  return session;
};
