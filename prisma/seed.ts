import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // Create Tenant
  const tenant = await prisma.tenant.upsert({
    where: { subdomain: 'demo' },
    update: {},
    create: {
      subdomain: 'demo',
      name: 'Demo Company',
      companyName: 'Demo Company Inc.',
      status: 'ACTIVE',
      plan: 'professional',
    },
  });
  console.log('✅ Created tenant:', tenant.name);

  // Create User
  const user = await prisma.user.upsert({
    where: { email: 'demo@slicterp.com' },
    update: {},
    create: {
      email: 'demo@slicterp.com',
      password: '$2a$10$rB7z1QXQY9wZ7Z7Z7Z7Z7OqK5x5x5x5x5x5x5x5x5x5x5', // password: demo123
      name: 'Demo User',
      tenantId: tenant.id,
      isActive: true,
    },
  });
  console.log('✅ Created user:', user.email);

  // Create Customers
  const customer1 = await prisma.customer.create({
    data: {
      name: 'Acme Corporation',
      email: 'contact@acme.com',
      phone: '+1-555-0100',
      type: 'COMPANY',
      tenantId: tenant.id,
    },
  });

  const customer2 = await prisma.customer.create({
    data: {
      name: 'TechStart Inc',
      email: 'info@techstart.com',
      phone: '+1-555-0200',
      type: 'COMPANY',
      tenantId: tenant.id,
    },
  });
  console.log('✅ Created customers');

  // Create Products
  const product1 = await prisma.product.create({
    data: {
      sku: 'PROD-001',
      name: 'Laptop Pro 15"',
      description: 'High-performance laptop',
      type: 'STORABLE',
      listPrice: 1299.99,
      costPrice: 899.99,
      qtyAvailable: 50,
      tenantId: tenant.id,
    },
  });

  const product2 = await prisma.product.create({
    data: {
      sku: 'PROD-002',
      name: 'Wireless Mouse',
      description: 'Ergonomic wireless mouse',
      type: 'STORABLE',
      listPrice: 29.99,
      costPrice: 15.00,
      qtyAvailable: 200,
      tenantId: tenant.id,
    },
  });

  const product3 = await prisma.product.create({
    data: {
      sku: 'PROD-003',
      name: 'USB-C Hub',
      description: '7-in-1 USB-C adapter',
      type: 'STORABLE',
      listPrice: 49.99,
      costPrice: 25.00,
      qtyAvailable: 150,
      tenantId: tenant.id,
    },
  });
  console.log('✅ Created products');

  // Create Warehouse
  const warehouse = await prisma.warehouse.create({
    data: {
      name: 'Main Warehouse',
      code: 'WH-001',
      address: '123 Industrial Rd',
      tenantId: tenant.id,
    },
  });
  console.log('✅ Created warehouse');

  // Create Manufacturing: Bill of Materials
  const bom1 = await prisma.billOfMaterials.create({
    data: {
      code: 'BOM-001',
      productId: product1.id,
      quantity: 1,
      type: 'MANUFACTURE',
      tenantId: tenant.id,
    },
  });

  const bom2 = await prisma.billOfMaterials.create({
    data: {
      code: 'BOM-002',
      productId: product3.id,
      quantity: 1,
      type: 'MANUFACTURE',
      tenantId: tenant.id,
    },
  });
  console.log('✅ Created BOMs');

  // Create Manufacturing Orders
  const mo1 = await prisma.manufacturingOrder.create({
    data: {
      reference: 'MO-2025-001',
      productId: product1.id,
      quantity: 10,
      bomId: bom1.id,
      status: 'IN_PROGRESS',
      startDate: new Date(),
      tenantId: tenant.id,
    },
  });

  const mo2 = await prisma.manufacturingOrder.create({
    data: {
      reference: 'MO-2025-002',
      productId: product3.id,
      quantity: 50,
      bomId: bom2.id,
      status: 'CONFIRMED',
      startDate: new Date(),
      tenantId: tenant.id,
    },
  });
  console.log('✅ Created manufacturing orders');

  // Create POS Config
  const posConfig = await prisma.pOSConfig.create({
    data: {
      name: 'Main POS',
      warehouseId: warehouse.id,
      allowDiscount: true,
      maxDiscount: 20,
      tenantId: tenant.id,
    },
  });
  console.log('✅ Created POS config');

  // Create POS Session
  const posSession = await prisma.pOSSession.create({
    data: {
      name: 'Session Jan 26, 2025',
      posConfigId: posConfig.id,
      userId: user.id,
      startDate: new Date(),
      openingCash: 500.00,
      status: 'OPEN',
      tenantId: tenant.id,
    },
  });
  console.log('✅ Created POS session');

  // Create POS Orders
  const posOrder1 = await prisma.pOSOrder.create({
    data: {
      reference: 'POS-2025-001',
      sessionId: posSession.id,
      customerId: customer1.id,
      subtotal: 1329.98,
      tax: 106.40,
      discount: 0,
      total: 1436.38,
      paymentMethod: 'CARD',
      status: 'PAID',
      tenantId: tenant.id,
      lines: {
        create: [
          {
            productId: product1.id,
            quantity: 1,
            price: 1299.99,
            discount: 0,
            total: 1299.99,
          },
          {
            productId: product2.id,
            quantity: 1,
            price: 29.99,
            discount: 0,
            total: 29.99,
          },
        ],
      },
    },
  });
  console.log('✅ Created POS orders');

  // Create Subscription Plans
  const plan1 = await prisma.subscriptionPlan.create({
    data: {
      name: 'Starter Plan',
      description: 'Perfect for small businesses',
      billingPeriod: 'MONTHLY',
      price: 29.99,
      trialDays: 14,
      features: { users: 5, storage: '10GB', support: 'email' },
      isActive: true,
      tenantId: tenant.id,
    },
  });

  const plan2 = await prisma.subscriptionPlan.create({
    data: {
      name: 'Professional Plan',
      description: 'For growing teams',
      billingPeriod: 'MONTHLY',
      price: 79.99,
      trialDays: 14,
      features: { users: 25, storage: '100GB', support: 'priority' },
      isActive: true,
      tenantId: tenant.id,
    },
  });

  const plan3 = await prisma.subscriptionPlan.create({
    data: {
      name: 'Enterprise Plan',
      description: 'For large organizations',
      billingPeriod: 'YEARLY',
      price: 999.00,
      trialDays: 30,
      features: { users: -1, storage: '1TB', support: '24/7' },
      isActive: true,
      tenantId: tenant.id,
    },
  });
  console.log('✅ Created subscription plans');

  // Create Subscriptions
  const sub1 = await prisma.subscription.create({
    data: {
      planId: plan2.id,
      customerId: customer1.id,
      status: 'ACTIVE',
      startDate: new Date(),
      nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      quantity: 1,
      unitPrice: 79.99,
      tenantId: tenant.id,
    },
  });

  const sub2 = await prisma.subscription.create({
    data: {
      planId: plan1.id,
      customerId: customer2.id,
      status: 'ACTIVE',
      startDate: new Date(),
      nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      quantity: 1,
      unitPrice: 29.99,
      tenantId: tenant.id,
    },
  });
  console.log('✅ Created subscriptions');

  // Create AI Workflows
  const workflow1 = await prisma.aIWorkflow.create({
    data: {
      name: 'Sales Lead Scoring',
      description: 'Automatically score leads based on engagement',
      triggerType: 'LEAD_CREATED',
      actions: [{ type: 'CALCULATE_SCORE' }, { type: 'SEND_EMAIL' }],
      conditions: { minEngagement: 50 },
      isActive: true,
      tenantId: tenant.id,
    },
  });

  const workflow2 = await prisma.aIWorkflow.create({
    data: {
      name: 'Invoice Reminder',
      description: 'Send reminders for overdue invoices',
      triggerType: 'SCHEDULED',
      actions: [{ type: 'CHECK_OVERDUE' }, { type: 'SEND_EMAIL' }],
      conditions: { daysOverdue: 7 },
      isActive: true,
      schedule: '0 9 * * *',
      tenantId: tenant.id,
    },
  });
  console.log('✅ Created AI workflows');

  // Create AI Insights
  const insight1 = await prisma.aIInsight.create({
    data: {
      type: 'REVENUE_FORECAST',
      title: 'Revenue Growth Predicted',
      description: 'Expected 15% revenue increase next quarter',
      data: { prediction: 15, confidence: 0.85 },
      confidence: 0.85,
      priority: 'HIGH',
      isRead: false,
      tenantId: tenant.id,
    },
  });

  const insight2 = await prisma.aIInsight.create({
    data: {
      type: 'CHURN_RISK',
      title: 'Customer Churn Alert',
      description: '3 customers at risk of churning',
      data: { atRiskCustomers: ['cust1', 'cust2', 'cust3'] },
      confidence: 0.72,
      priority: 'MEDIUM',
      isRead: false,
      tenantId: tenant.id,
    },
  });
  console.log('✅ Created AI insights');

  // Create Patients
  const patient1 = await prisma.patient.create({
    data: {
      patientNumber: 'PAT-2025-001',
      firstName: 'John',
      lastName: 'Smith',
      dateOfBirth: new Date('1985-06-15'),
      gender: 'MALE',
      contactNumber: '+1-555-0301',
      email: 'john.smith@email.com',
      bloodGroup: 'O+',
      tenantId: tenant.id,
    },
  });

  const patient2 = await prisma.patient.create({
    data: {
      patientNumber: 'PAT-2025-002',
      firstName: 'Sarah',
      lastName: 'Johnson',
      dateOfBirth: new Date('1992-03-22'),
      gender: 'FEMALE',
      contactNumber: '+1-555-0302',
      email: 'sarah.j@email.com',
      bloodGroup: 'A+',
      tenantId: tenant.id,
    },
  });
  console.log('✅ Created patients');

  // Create Medical Appointments
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(10, 0, 0, 0);

  const appointment1 = await prisma.medicalAppointment.create({
    data: {
      patientId: patient1.id,
      doctorId: user.id,
      appointmentDate: tomorrow,
      appointmentType: 'CONSULTATION',
      status: 'SCHEDULED',
      reason: 'Annual checkup',
      tenantId: tenant.id,
    },
  });

  const nextWeek = new Date();
  nextWeek.setDate(nextWeek.getDate() + 7);
  nextWeek.setHours(14, 30, 0, 0);

  const appointment2 = await prisma.medicalAppointment.create({
    data: {
      patientId: patient2.id,
      doctorId: user.id,
      appointmentDate: nextWeek,
      appointmentType: 'FOLLOW_UP',
      status: 'SCHEDULED',
      reason: 'Lab results review',
      tenantId: tenant.id,
    },
  });
  console.log('✅ Created medical appointments');

  console.log('\n🎉 Seed completed successfully!');
  console.log('\n📊 Summary:');
  console.log('- 1 Tenant (demo)');
  console.log('- 1 User (demo@slicterp.com)');
  console.log('- 2 Customers');
  console.log('- 3 Products');
  console.log('- 1 Warehouse');
  console.log('- 2 BOMs');
  console.log('- 2 Manufacturing Orders');
  console.log('- 1 POS Session (OPEN)');
  console.log('- 1 POS Order');
  console.log('- 3 Subscription Plans');
  console.log('- 2 Active Subscriptions');
  console.log('- 2 AI Workflows');
  console.log('- 2 AI Insights');
  console.log('- 2 Patients');
  console.log('- 2 Medical Appointments');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('❌ Seed failed:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
