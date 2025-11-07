import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getOrCreateDefaultTenant } from '@/lib/get-tenant';

// GET /api/inventory/warehouses - Get all warehouses
export async function GET(request: NextRequest) {
  try {
    const tenant = await getOrCreateDefaultTenant();

    const warehouses = await prisma.warehouse.findMany({
      where: {
        tenantId: tenant.id,
      },
      include: {
        stockMoves: {
          include: {
            product: true,
          },
        },
        posConfigs: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(warehouses);
  } catch (error) {
    console.error('Error fetching warehouses:', error);
    return NextResponse.json({ error: 'Failed to fetch warehouses' }, { status: 500 });
  }
}

// POST /api/inventory/warehouses - Create new warehouse
export async function POST(request: NextRequest) {
  try {
    const tenant = await getOrCreateDefaultTenant();
    const body = await request.json();

    const warehouse = await prisma.warehouse.create({
      data: {
        name: body.name,
        code: body.code,
        address: body.address,
        tenantId: tenant.id,
      },
    });

    return NextResponse.json(warehouse, { status: 201 });
  } catch (error) {
    console.error('Error creating warehouse:', error);
    return NextResponse.json({ error: 'Failed to create warehouse' }, { status: 500 });
  }
}
