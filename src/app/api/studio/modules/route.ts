import { NextRequest, NextResponse } from 'next/server';
import { getCustomModules, createCustomModule } from '@/apps/studio/api';
import { getOrCreateDefaultTenant } from '@/lib/get-tenant';

export async function GET(request: NextRequest) {
  try {
    const tenant = await getOrCreateDefaultTenant();
    const tenantId = tenant.id;
    
    const modules = await getCustomModules(tenantId);
    return NextResponse.json(modules);
  } catch (error) {
    console.error('Error fetching custom modules:', error);
    return NextResponse.json(
      { error: 'Failed to fetch custom modules' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const tenant = await getOrCreateDefaultTenant();
    const tenantId = tenant.id;
    const data = await request.json();
    
    const module = await createCustomModule({
      ...data,
      tenantId,
    });
    
    return NextResponse.json(module, { status: 201 });
  } catch (error) {
    console.error('Error creating custom module:', error);
    return NextResponse.json(
      { error: 'Failed to create custom module' },
      { status: 500 }
    );
  }
}
