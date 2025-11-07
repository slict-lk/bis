import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getOrCreateDefaultTenant } from '@/lib/get-tenant';
import { SystemRoles, Permission } from '@/lib/rbac';

export const dynamic = 'force-dynamic';

// GET /api/rbac/roles - Get all roles
export async function GET(request: NextRequest) {
  try {
    const tenant = await getOrCreateDefaultTenant();

    const roles = await prisma.role.findMany({
      where: {
        tenantId: tenant.id,
      },
      include: {
        _count: {
          select: {
            users: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(roles);
  } catch (error) {
    console.error('Error fetching roles:', error);
    return NextResponse.json({ error: 'Failed to fetch roles' }, { status: 500 });
  }
}

// POST /api/rbac/roles - Create new role
export async function POST(request: NextRequest) {
  try {
    const tenant = await getOrCreateDefaultTenant();
    const body = await request.json();

    // Validate permissions
    const validPermissions = Object.values(Permission);
    const invalidPermissions = body.permissions?.filter(
      (p: string) => !validPermissions.includes(p as Permission)
    );

    if (invalidPermissions && invalidPermissions.length > 0) {
      return NextResponse.json(
        { error: `Invalid permissions: ${invalidPermissions.join(', ')}` },
        { status: 400 }
      );
    }

    const role = await prisma.role.create({
      data: {
        name: body.name,
        description: body.description || '',
        permissions: body.permissions || [],
        isSystem: false, // Custom roles are never system roles
        tenantId: tenant.id,
      },
    });

    return NextResponse.json(role, { status: 201 });
  } catch (error) {
    console.error('Error creating role:', error);
    return NextResponse.json({ error: 'Failed to create role' }, { status: 500 });
  }
}

// PUT /api/rbac/roles/:id - Update role
export async function PUT(request: NextRequest) {
  try {
    const tenant = await getOrCreateDefaultTenant();
    const { searchParams } = new URL(request.url);
    const roleId = searchParams.get('id');
    const body = await request.json();

    if (!roleId) {
      return NextResponse.json({ error: 'Role ID required' }, { status: 400 });
    }

    // Check if role exists and is not a system role
    const existingRole = await prisma.role.findFirst({
      where: {
        id: roleId,
        tenantId: tenant.id,
      },
    });

    if (!existingRole) {
      return NextResponse.json({ error: 'Role not found' }, { status: 404 });
    }

    if (existingRole.isSystem) {
      return NextResponse.json(
        { error: 'Cannot modify system roles' },
        { status: 403 }
      );
    }

    // Validate permissions
    if (body.permissions) {
      const validPermissions = Object.values(Permission);
      const invalidPermissions = body.permissions.filter(
        (p: string) => !validPermissions.includes(p as Permission)
      );

      if (invalidPermissions.length > 0) {
        return NextResponse.json(
          { error: `Invalid permissions: ${invalidPermissions.join(', ')}` },
          { status: 400 }
        );
      }
    }

    const role = await prisma.role.update({
      where: { id: roleId },
      data: {
        name: body.name,
        description: body.description,
        permissions: body.permissions,
      },
    });

    return NextResponse.json(role);
  } catch (error) {
    console.error('Error updating role:', error);
    return NextResponse.json({ error: 'Failed to update role' }, { status: 500 });
  }
}

// DELETE /api/rbac/roles/:id - Delete role
export async function DELETE(request: NextRequest) {
  try {
    const tenant = await getOrCreateDefaultTenant();
    const { searchParams } = new URL(request.url);
    const roleId = searchParams.get('id');

    if (!roleId) {
      return NextResponse.json({ error: 'Role ID required' }, { status: 400 });
    }

    // Check if role exists and is not a system role
    const existingRole = await prisma.role.findFirst({
      where: {
        id: roleId,
        tenantId: tenant.id,
      },
      include: {
        _count: {
          select: {
            users: true,
          },
        },
      },
    });

    if (!existingRole) {
      return NextResponse.json({ error: 'Role not found' }, { status: 404 });
    }

    if (existingRole.isSystem) {
      return NextResponse.json(
        { error: 'Cannot delete system roles' },
        { status: 403 }
      );
    }

    if (existingRole._count.users > 0) {
      return NextResponse.json(
        { error: 'Cannot delete role with assigned users' },
        { status: 400 }
      );
    }

    await prisma.role.delete({
      where: { id: roleId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting role:', error);
    return NextResponse.json({ error: 'Failed to delete role' }, { status: 500 });
  }
}
