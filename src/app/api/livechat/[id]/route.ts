import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/livechat/[id] - Get chat session with messages
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const chat = await prisma.liveChat.findUnique({
      where: { id },
      include: {
        messages: {
          orderBy: { createdAt: 'asc' },
        },
        assignedTo: {
          select: { id: true, name: true, email: true, avatar: true },
        },
      },
    });

    if (!chat) {
      return NextResponse.json({ error: 'Chat not found' }, { status: 404 });
    }

    return NextResponse.json(chat);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PATCH /api/livechat/[id] - Update chat session
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status, assignedToId, rating, feedback } = body;

    const chat = await prisma.liveChat.update({
      where: { id },
      data: {
        ...(status && { status }),
        ...(assignedToId !== undefined && { assignedToId }),
        ...(rating !== undefined && { rating }),
        ...(feedback !== undefined && { feedback }),
        ...(status === 'RESOLVED' || status === 'CLOSED' ? { endedAt: new Date() } : {}),
      },
      include: {
        assignedTo: {
          select: { id: true, name: true, email: true },
        },
      },
    });

    return NextResponse.json(chat);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
