import { NextApiRequest } from 'next';
import { auth } from '@/auth';

interface User {
  id: string;
  tenantId: string;
  email: string;
  name: string;
}

export async function getCurrentUser(req?: NextApiRequest): Promise<User | null> {
  const session = await auth();
  if (!session?.user) return null;
  
  return {
    id: session.user.id,
    tenantId: session.user.tenantId,
    email: session.user.email,
    name: session.user.name
  };
}

export async function getCurrentTenant(): Promise<{ id: string } | null> {
  const user = await getCurrentUser();
  if (!user?.tenantId) return null;
  
  return {
    id: user.tenantId,
    // Add other tenant fields as needed
  };
}
