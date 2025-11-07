import prisma from './prisma';

export async function getOrCreateDefaultTenant() {
  // Try to find existing tenant
  let tenant = await prisma.tenant.findFirst({
    where: { status: 'ACTIVE' },
  });

  // If no tenant exists, create a default one
  if (!tenant) {
    tenant = await prisma.tenant.create({
      data: {
        subdomain: 'default',
        name: 'Default Company',
        companyName: 'My Company',
        status: 'ACTIVE',
        plan: 'professional',
      },
    });
  }

  return tenant;
}
