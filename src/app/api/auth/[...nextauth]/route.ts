import { authOptions } from '@/lib/auth-config';
import NextAuth from 'next-auth';
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import type { JWT } from 'next-auth/jwt';
import type { User } from 'next-auth';

const handler = NextAuth({
  ...authOptions,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password required');
        }

        try {
          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email,
            },
            include: {
              tenant: true,
              role: true,
              employee: {
                select: {
                  id: true,
                  firstName: true,
                  lastName: true,
                  employeeNumber: true,
                  department: {
                    select: {
                      id: true,
                      name: true,
                    },
                  },
                },
              },
            },
          });

          if (!user || !user.isActive) {
            throw new Error('Invalid credentials');
          }

          // For demo purposes, accept demo credentials
          if (credentials.email === 'demo@slicterp.com' && credentials.password === 'demo123') {
            return {
              id: user.id,
              email: user.email,
              name: user.name || '',
              role: user.role?.name || null,
              tenantId: user.tenantId,
              tenant: user.tenant?.name || 'Default',
              employee: user.employee || null,
            };
          }

          // In production, verify password hash
          if (user.password) {
            const isValid = await bcrypt.compare(credentials.password, user.password);
            if (!isValid) {
              throw new Error('Invalid credentials');
            }
          } else {
            throw new Error('Invalid credentials');
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name || '',
            role: user.role?.name || null,
            tenantId: user.tenantId,
            tenant: user.tenant?.name || 'Default',
            employee: user.employee || null,
          };
        } catch (error) {
          console.error('Auth error:', error);
          throw new Error('Authentication failed');
        }
      }
    })
  ],
  pages: {
    signIn: '/login',
    signOut: '/login',
    error: '/login',
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) {
        token.id = user.id;
        token.tenantId = user.tenantId as string;
        token.tenant = (user.tenant || 'Default') as string;
        token.role = (user.role || null) as string | null;
        token.employee = user.employee || null;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.tenantId = token.tenantId as string;
        session.user.tenant = token.tenant as string;
        session.user.role = token.role as string | null;
        session.user.employee = token.employee as any;
      }
      return session;
    },
    async signIn({ user }) {
      // Update last login
      if (user.id) {
        await prisma.user.update({
          where: { id: user.id },
          data: { lastLoginAt: new Date() },
        });
      }
      return true;
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET || 'default-secret',
});

export { handler as GET, handler as POST };
