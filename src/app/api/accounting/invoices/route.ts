import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getOrCreateDefaultTenant } from '@/lib/get-tenant';

// GET /api/accounting/invoices - Get all invoices
export async function GET(request: NextRequest) {
  try {
    const tenant = await getOrCreateDefaultTenant();
    const { searchParams } = new URL(request.url);
    const statusParam = searchParams.get('status');
    const typeParam = searchParams.get('type');
    const customerId = searchParams.get('customerId');

    const invoices = await prisma.invoice.findMany({
      where: {
        tenantId: tenant.id,
        ...(statusParam && { status: statusParam as 'DRAFT' | 'OPEN' | 'PAID' | 'OVERDUE' | 'CANCELLED' }),
        ...(typeParam && { type: typeParam as 'SALES' | 'PURCHASE' }),
        ...(customerId && { customerId }),
      },
      include: {
        customer: true,
        salesOrder: true,
        lines: {
          include: {
            product: true,
          },
        },
        payments: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(invoices);
  } catch (error) {
    console.error('Error fetching invoices:', error);
    return NextResponse.json({ error: 'Failed to fetch invoices' }, { status: 500 });
  }
}

// POST /api/accounting/invoices - Create new invoice
export async function POST(request: NextRequest) {
  try {
    const tenant = await getOrCreateDefaultTenant();
    const body = await request.json();

    const invoice = await prisma.invoice.create({
      data: {
        invoiceNumber: body.invoiceNumber || `INV-${Date.now()}`,
        status: (body.status as 'DRAFT' | 'OPEN' | 'PAID' | 'OVERDUE' | 'CANCELLED') || 'DRAFT',
        type: (body.type as 'SALES' | 'PURCHASE') || 'SALES',
        customerId: body.customerId,
        salesOrderId: body.salesOrderId,
        issueDate: body.issueDate ? new Date(body.issueDate) : new Date(),
        dueDate: body.dueDate ? new Date(body.dueDate) : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        subtotal: body.subtotal,
        tax: body.tax || 0,
        total: body.total,
        amountPaid: body.amountPaid || 0,
        amountDue: body.total - (body.amountPaid || 0),
        notes: body.notes,
        tenantId: tenant.id,
        lines: {
          create: body.lines?.map((line: any) => ({
            productId: line.productId,
            description: line.description,
            quantity: line.quantity,
            unitPrice: line.unitPrice,
            tax: line.tax || 0,
            subtotal: line.subtotal,
          })) || [],
        },
      },
      include: {
        customer: true,
        lines: {
          include: {
            product: true,
          },
        },
      },
    });

    return NextResponse.json(invoice, { status: 201 });
  } catch (error) {
    console.error('Error creating invoice:', error);
    return NextResponse.json({ error: 'Failed to create invoice' }, { status: 500 });
  }
}
