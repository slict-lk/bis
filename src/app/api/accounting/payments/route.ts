import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getOrCreateDefaultTenant } from '@/lib/get-tenant';

// GET /api/accounting/payments - Get all payments
export async function GET(request: NextRequest) {
  try {
    const tenant = await getOrCreateDefaultTenant();
    const { searchParams } = new URL(request.url);
    const invoiceId = searchParams.get('invoiceId');
    const method = searchParams.get('method') as any;

    const payments = await prisma.payment.findMany({
      where: {
        tenantId: tenant.id,
        ...(invoiceId && { invoiceId }),
        ...(method && { method }),
      },
      include: {
        invoice: {
          include: {
            customer: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(payments);
  } catch (error) {
    console.error('Error fetching payments:', error);
    return NextResponse.json({ error: 'Failed to fetch payments' }, { status: 500 });
  }
}

// POST /api/accounting/payments - Create new payment
export async function POST(request: NextRequest) {
  try {
    const tenant = await getOrCreateDefaultTenant();
    const body = await request.json();

    const payment = await prisma.payment.create({
      data: {
        paymentNumber: body.paymentNumber || `PAY-${Date.now()}`,
        amount: body.amount,
        paymentDate: body.paymentDate ? new Date(body.paymentDate) : new Date(),
        method: body.method as any,
        reference: body.reference,
        invoiceId: body.invoiceId,
        tenantId: tenant.id,
      },
      include: {
        invoice: {
          include: {
            customer: true,
          },
        },
      },
    });

    return NextResponse.json(payment, { status: 201 });
  } catch (error) {
    console.error('Error creating payment:', error);
    return NextResponse.json({ error: 'Failed to create payment' }, { status: 500 });
  }
}
