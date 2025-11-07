// Sales & CRM API Functions
import prisma from '@/lib/prisma';
import type { SalesOrder, Lead, Customer, Quotation } from './types';

export async function getSalesOrders(tenantId: string) {
  return await prisma.salesOrder.findMany({
    where: { tenantId },
    include: {
      customer: true,
      lines: {
        include: {
          product: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  });
}

export async function createSalesOrder(data: Partial<SalesOrder> & { tenantId: string }) {
  return await prisma.salesOrder.create({
    data: {
      orderNumber: data.orderNumber!,
      status: data.status || 'DRAFT',
      customerId: data.customerId!,
      orderDate: data.orderDate || new Date(),
      subtotal: data.subtotal!,
      tax: data.tax || 0,
      discount: data.discount || 0,
      total: data.total!,
      notes: data.notes,
      tenantId: data.tenantId,
    },
  });
}

export async function getLeads(tenantId: string) {
  return await prisma.lead.findMany({
    where: { tenantId },
    include: { customer: true },
    orderBy: { createdAt: 'desc' },
  });
}

export async function createLead(data: Partial<Lead> & { tenantId: string }) {
  return await prisma.lead.create({
    data: {
      name: data.name!,
      email: data.email,
      phone: data.phone,
      source: data.source,
      status: data.status || 'NEW',
      priority: data.priority || 'MEDIUM',
      expectedRevenue: data.expectedRevenue,
      probability: data.probability,
      customerId: data.customerId,
      tenantId: data.tenantId,
    },
  });
}

export async function getCustomers(tenantId: string) {
  return await prisma.customer.findMany({
    where: { tenantId },
    orderBy: { name: 'asc' },
  });
}

export async function createCustomer(data: Partial<Customer> & { tenantId: string }) {
  return await prisma.customer.create({
    data: {
      name: data.name!,
      email: data.email,
      phone: data.phone,
      type: data.type || 'INDIVIDUAL',
      taxId: data.taxId,
      website: data.website,
      street: data.address?.street,
      city: data.address?.city,
      state: data.address?.state,
      zipCode: data.address?.zipCode,
      country: data.address?.country,
      tenantId: data.tenantId,
    },
  });
}
