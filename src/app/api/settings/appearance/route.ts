import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/session';

interface AppearanceSettings {
  primaryColor: string;
  theme: string;
  borderRadius: string;
  compactMode: boolean;
  glassmorphism: boolean;
  headerBlur: boolean;
}

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user?.tenantId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const tenant = await prisma.tenant.findUnique({
      where: { id: user.tenantId }
    });
    
    if (!tenant) {
      return NextResponse.json({ error: 'Tenant not found' }, { status: 404 });
    }

    const body = await req.json() as AppearanceSettings;
    
    const updated = await prisma.tenant.update({
      where: { id: user.tenantId },
      data: {
        primaryColor: body.primaryColor,
        settings: {
          ...(tenant.settings as object || {}),
          ...body
        }
      }
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error('[APPEARANCE_SETTINGS_ERROR]', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
