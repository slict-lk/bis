import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const tenantId = req.headers.get('x-tenant-id') || 'default-tenant';

    const posts = await prisma.blogPost.findMany({
      where: { tenantId },
      include: {
        author: { select: { name: true, email: true } },
      },
      orderBy: { publishedAt: 'desc' },
      take: 50,
    });

    const publishedCount = await prisma.blogPost.count({
      where: { tenantId, isPublished: true },
    });

    return NextResponse.json({
      posts,
      publishedCount,
      totalCount: posts.length,
    });
  } catch (error: any) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const tenantId = req.headers.get('x-tenant-id') || 'default-tenant';
    const data = await req.json();

    const post = await prisma.blogPost.create({
      data: {
        ...data,
        tenantId,
      },
      include: {
        author: { select: { name: true, email: true } },
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error: any) {
    console.error('Error creating blog post:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
