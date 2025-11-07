import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const tenantId = searchParams.get('tenantId');

    if (!tenantId) {
      return NextResponse.json({ error: 'Tenant ID required' }, { status: 400 });
    }

    const presentations = await prisma.presentation.findMany({
      where: { tenantId },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(presentations);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { tenantId, title, slug, description, slides, isPublic, password } = body;

    if (!tenantId || !title || !slides) {
      return NextResponse.json({ error: 'Required fields missing' }, { status: 400 });
    }

    const presentation = await prisma.presentation.create({
      data: {
        tenantId,
        title,
        slug: slug || title.toLowerCase().replace(/\s+/g, '-'),
        description,
        slides,
        isPublic: isPublic ?? false,
        password,
      },
    });

    return NextResponse.json(presentation, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
