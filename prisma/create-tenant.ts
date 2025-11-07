const { PrismaClient, Prisma, TenantStatus } = require('@prisma/client');

const prisma = new PrismaClient();

async function createTenant() {
  const tenantData = {
    name: 'SLICT',
    subdomain: 'slict',
    companyName: 'SLICT (Pvt) Ltd',
    status: TenantStatus.ACTIVE,
    plan: 'enterprise',
    primaryColor: '#3b82f6',
  };

  try {
    const tenant = await prisma.tenant.upsert({
      where: { subdomain: tenantData.subdomain },
      create: tenantData,
      update: tenantData,
    });

    console.log('Tenant ensured:', tenant);
  } catch (error) {
    console.error('Error creating tenant:', error);
    process.exitCode = 1;
  } finally {
    await prisma.$disconnect();
  }
}

createTenant().catch((error) => {
  console.error('Unhandled error:', error);
  process.exitCode = 1;
});

module.exports = {};
