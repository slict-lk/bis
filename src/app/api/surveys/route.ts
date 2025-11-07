import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const tenantId = req.headers.get('x-tenant-id') || 'default-tenant';

    const surveys = await prisma.survey.findMany({
      where: { tenantId },
      include: {
        _count: { select: { responses: true } },
      },
      orderBy: { createdAt: 'desc' },
      take: 50,
    });

    return NextResponse.json(surveys);
  } catch (error: any) {
    console.error('Error fetching surveys:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const tenantId = req.headers.get('x-tenant-id') || 'default-tenant';
    const data = await req.json();

    const survey = await prisma.survey.create({
      data: {
        ...data,
        tenantId,
      },
    });

    return NextResponse.json(survey, { status: 201 });
  } catch (error: any) {
    console.error('Error creating survey:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
