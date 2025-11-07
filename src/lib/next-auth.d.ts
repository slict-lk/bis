import { User as PrismaUser } from '@prisma/client';
import 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
      name?: string;
      tenantId: string;
      tenant: string;
      role: string | null;
      employee?: any;
    };
  }

  interface User extends Partial<PrismaUser> {
    tenant: string;
    role: string | null;
    employee?: any;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    tenantId: string;
    tenant: string;
    role: string | null;
    employee?: any;
  }
}
