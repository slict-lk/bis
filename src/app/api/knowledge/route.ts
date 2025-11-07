import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/knowledge - List knowledge articles
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const tenantId = searchParams.get('tenantId');
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const published = searchParams.get('published');

    if (!tenantId) {
      return NextResponse.json({ error: 'Tenant ID required' }, { status: 400 });
    }

    const articles = await prisma.knowledgeArticle.findMany({
      where: {
        tenantId,
        ...(category && { category }),
        ...(published === 'true' && { isPublished: true }),
        ...(search && {
          OR: [
            { title: { contains: search, mode: 'insensitive' } },
            { content: { contains: search, mode: 'insensitive' } },
          ],
        }),
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(articles);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST /api/knowledge - Create knowledge article
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { tenantId, title, slug, content, excerpt, category, tags, isPublished } = body;

    if (!tenantId || !title || !content) {
      return NextResponse.json({ error: 'Required fields missing' }, { status: 400 });
    }

    const article = await prisma.knowledgeArticle.create({
      data: {
        tenantId,
        title,
        slug: slug || title.toLowerCase().replace(/\s+/g, '-'),
        content,
        excerpt,
        category,
        tags: tags || [],
        isPublished: isPublished || false,
        ...(isPublished && { publishedAt: new Date() }),
      },
    });

    return NextResponse.json(article, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
