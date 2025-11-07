import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/properties - List properties
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const tenantId = searchParams.get('tenantId');
    const status = searchParams.get('status');
    const propertyType = searchParams.get('propertyType');
    const city = searchParams.get('city');

    if (!tenantId) {
      return NextResponse.json({ error: 'Tenant ID required' }, { status: 400 });
    }

    const properties = await prisma.property.findMany({
      where: {
        tenantId,
        ...(status && { status: status as any }),
        ...(propertyType && { propertyType: propertyType as any }),
        ...(city && { city }),
      },
      include: {
        _count: { select: { viewings: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(properties);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST /api/properties - Create property
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { tenantId, title, description, propertyType, listingType, address, city, state, zipCode, country,
            bedrooms, bathrooms, area, yearBuilt, price, images, videoUrl } = body;

    if (!tenantId || !title || !propertyType || !listingType || !price) {
      return NextResponse.json({ error: 'Required fields missing' }, { status: 400 });
    }

    const property = await prisma.property.create({
      data: {
        tenantId, title, description, propertyType, listingType,
        address: address || '', city: city || '', state: state || '', zipCode: zipCode || '', country: country || '',
        bedrooms, bathrooms, area, yearBuilt, price, currency: 'USD',
        images: images || [], videoUrl,
      },
    });

    return NextResponse.json(property, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
