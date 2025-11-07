import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getOrCreateDefaultTenant } from '@/lib/get-tenant';

// GET /api/accounting/expenses - Get all expenses
export async function GET(request: NextRequest) {
  try {
    const tenant = await getOrCreateDefaultTenant();
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') as any;
    const category = searchParams.get('category');
    const employeeId = searchParams.get('employeeId');

    const expenses = await prisma.expense.findMany({
      where: {
        tenantId: tenant.id,
        ...(status && { status }),
        ...(category && { category }),
        ...(employeeId && { employeeId }),
      },
      include: {
        employee: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(expenses);
  } catch (error) {
    console.error('Error fetching expenses:', error);
    return NextResponse.json({ error: 'Failed to fetch expenses' }, { status: 500 });
  }
}

// POST /api/accounting/expenses - Create new expense
export async function POST(request: NextRequest) {
  try {
    const tenant = await getOrCreateDefaultTenant();
    const body = await request.json();

    const expense = await prisma.expense.create({
      data: {
        description: body.description,
        amount: body.amount,
        category: body.category,
        expenseDate: body.expenseDate ? new Date(body.expenseDate) : new Date(),
        employeeId: body.employeeId,
        status: (body.status as any) || 'DRAFT',
        receipt: body.receipt,
        notes: body.notes,
        tenantId: tenant.id,
      },
      include: {
        employee: true,
      },
    });

    return NextResponse.json(expense, { status: 201 });
  } catch (error) {
    console.error('Error creating expense:', error);
    return NextResponse.json({ error: 'Failed to create expense' }, { status: 500 });
  }
}
