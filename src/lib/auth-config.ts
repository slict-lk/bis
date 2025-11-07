// NextAuth.js Configuration
// This is a template - you'll need to install next-auth first:
// npm install next-auth bcryptjs
// npm install --save-dev @types/bcryptjs

import NextAuth from 'next-auth';
import type { AuthOptions } from 'next-auth';
import type { JWT } from 'next-auth/jwt';
import type { User } from 'next-auth';

import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid credentials');
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
          include: { tenant: true, role: true },
        });

        if (!user) {
          throw new Error('User not found');
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password || ''
        );

        if (!isPasswordValid) {
          throw new Error('Invalid password');
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name || '',
          tenantId: user.tenantId,
          tenant: user.tenant?.name || 'Default',
          role: user.role?.name || null,
        };
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) {
        token.id = user.id;
        token.tenantId = user.tenantId as string;
        token.tenant = (user.tenant || 'Default') as string;
        token.role = (user.role || null) as string | null;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.tenantId = token.tenantId as string;
        session.user.tenant = token.tenant as string;
        session.user.role = token.role as string | null;
      }
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET || 'default-secret',
};

export default NextAuth(authOptions);
