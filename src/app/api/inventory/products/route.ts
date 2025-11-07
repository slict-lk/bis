import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getOrCreateDefaultTenant } from '@/lib/get-tenant';

// GET /api/inventory/products - Get all products
export async function GET(request: NextRequest) {
  try {
    const tenant = await getOrCreateDefaultTenant();
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const typeParam = searchParams.get('type');
    const categoryId = searchParams.get('categoryId');
    const isActive = searchParams.get('isActive');

    const products = await prisma.product.findMany({
      where: {
        tenantId: tenant.id,
        ...(search && {
          OR: [
            { name: { contains: search, mode: 'insensitive' } },
            { sku: { contains: search, mode: 'insensitive' } },
            { description: { contains: search, mode: 'insensitive' } },
          ],
        }),
        ...(typeParam && { type: typeParam as 'STORABLE' | 'CONSUMABLE' | 'SERVICE' }),
        ...(categoryId && { categoryId }),
        ...(isActive && { isActive: isActive === 'true' }),
      },
      include: {
        category: true,
        salesOrderLines: true,
        invoiceLines: true,
        stockMoves: true,
        billOfMaterials: {
          include: {
            orders: true,
          },
        },
        manufacturingOrders: {
          include: {
            bom: true,
          },
        },
        posOrderLines: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

// POST /api/inventory/products - Create new product
export async function POST(request: NextRequest) {
  try {
    const tenant = await getOrCreateDefaultTenant();
    const body = await request.json();

    const product = await prisma.product.create({
      data: {
        sku: body.sku,
        name: body.name,
        description: body.description,
        type: (body.type as 'STORABLE' | 'CONSUMABLE' | 'SERVICE') || 'STORABLE',
        listPrice: body.listPrice,
        costPrice: body.costPrice,
        qtyAvailable: body.qtyAvailable || 0,
        qtyReserved: body.qtyReserved || 0,
        barcode: body.barcode,
        weight: body.weight,
        volume: body.volume,
        isActive: body.isActive !== false,
        canBeSold: body.canBeSold !== false,
        canBePurchased: body.canBePurchased !== false,
        categoryId: body.categoryId,
        tenantId: tenant.id,
      },
      include: {
        category: true,
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}
