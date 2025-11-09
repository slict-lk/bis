const { PrismaClient } = require('@prisma/client');
const { hash } = require('bcryptjs');

const prisma = new PrismaClient();

async function createTenantAndSuperAdmin() {
  // Customize these values as needed
  const tenantData = {
    name: 'SLICT',
    subdomain: 'slict',
    companyName: 'SLICT LLC',
    status: 'ACTIVE',
    plan: 'enterprise',
    primaryColor: '#3b82f6',
    domain: 'slict.lk',
  };

  const superAdminData = {
    email: 'mubasshir@slict.lk',
    password: 'Ms251985',
    name: 'Mubasshir',
  };

  const demoUserData = {
    email: 'demo@slicterp.com',
    password: 'demo123',
    name: 'Demo User',
  };

  try {
    // Create tenant
    const tenant = await prisma.tenant.create({
      data: tenantData,
    });
    console.log('Created tenant:', tenant);

    // Create SuperAdmin user
    const hashedPassword = await hash(superAdminData.password, 10);
    const superAdmin = await prisma.user.create({
      data: {
        email: superAdminData.email,
        name: superAdminData.name,
        password: hashedPassword,
        isSuperAdmin: true,
        isActive: true,
        tenantId: tenant.id,
      },
    });
    console.log('Created SuperAdmin user:', superAdmin);

    // Create Demo user
    const demoHashedPassword = await hash(demoUserData.password, 10);
    const demoUser = await prisma.user.create({
      data: {
        email: demoUserData.email,
        name: demoUserData.name,
        password: demoHashedPassword,
        isActive: true,
        isSuperAdmin: false,
        tenantId: tenant.id,
      },
    });
    console.log('Created Demo user:', demoUser);

    console.log('Setup completed successfully!');
    console.log('SuperAdmin credentials:', { email: superAdminData.email, password: superAdminData.password });
    console.log('Demo credentials:', { email: demoUserData.email, password: demoUserData.password });
  } catch (error) {
    console.error('Error during setup:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

createTenantAndSuperAdmin();

module.exports = {};
