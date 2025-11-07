import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/restaurant/tables - List tables
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const tenantId = searchParams.get('tenantId');
    const status = searchParams.get('status');

    if (!tenantId) {
      return NextResponse.json({ error: 'Tenant ID required' }, { status: 400 });
    }

    const tables = await prisma.restaurantTable.findMany({
      where: {
        tenantId,
        ...(status && { status: status as any }),
      },
      include: {
        reservations: {
          where: {
            reservationDate: { gte: new Date() },
          },
          orderBy: { reservationDate: 'asc' },
          take: 5,
        },
      },
      orderBy: { tableNumber: 'asc' },
    });

    return NextResponse.json(tables);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST /api/restaurant/tables - Create table
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { tenantId, tableNumber, capacity, location } = body;

    if (!tenantId || !tableNumber || !capacity) {
      return NextResponse.json({ error: 'Required fields missing' }, { status: 400 });
    }

    const table = await prisma.restaurantTable.create({
      data: {
        tenantId,
        tableNumber,
        capacity,
        location,
        status: 'AVAILABLE',
      },
    });

    return NextResponse.json(table, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
