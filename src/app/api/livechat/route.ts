import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/livechat - List all live chat sessions
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const tenantId = searchParams.get('tenantId');
    const status = searchParams.get('status');

    if (!tenantId) {
      return NextResponse.json({ error: 'Tenant ID required' }, { status: 400 });
    }

    const chats = await prisma.liveChat.findMany({
      where: {
        tenantId,
        ...(status && { status: status as any }),
      },
      include: {
        messages: {
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
        assignedTo: {
          select: { id: true, name: true, email: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(chats);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST /api/livechat - Create new chat session
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { tenantId, visitorName, visitorEmail, visitorIP, userAgent } = body;

    if (!tenantId) {
      return NextResponse.json({ error: 'Tenant ID required' }, { status: 400 });
    }

    const sessionId = `chat_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    const chat = await prisma.liveChat.create({
      data: {
        tenantId,
        sessionId,
        visitorName,
        visitorEmail,
        visitorIP,
        userAgent,
        status: 'ACTIVE',
      },
    });

    return NextResponse.json(chat, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
