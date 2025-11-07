import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import { formatSuccessResponse } from '@/lib/error-handler';
import { tryCatch } from '@/lib/error-handler';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  return tryCatch(async () => {
    const { id } = await params;
    const user = await getCurrentUser();
    if (!user?.tenantId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const dbUser = await prisma.user.findFirst({
      where: {
        id,
        tenantId: user.tenantId,
      },
      include: {
        employee: true,
      },
    });

    if (!dbUser) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Remove password from response
    const { password, ...userWithoutPassword } = dbUser;

    return NextResponse.json(userWithoutPassword);
  }, 'Failed to fetch user');
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  return tryCatch(async () => {
    const { id } = await params;
    const user = await getCurrentUser();
    if (!user?.tenantId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Check if user has admin role or is updating themselves
    const targetUser = await prisma.user.findFirst({
      where: {
        id,
        tenantId: user.tenantId,
      },
    });

    if (!targetUser) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    if (user.role !== 'ADMIN' && user.id !== id) {
      return NextResponse.json(
        { error: 'Insufficient permissions' },
        { status: 403 }
      );
    }

    const body = await request.json();

    // Prepare update data
    const updateData: any = {};

    // Update name if firstName or lastName are provided
    if (body.firstName !== undefined || body.lastName !== undefined) {
      const currentName = targetUser.name.split(' ');
      const firstName = body.firstName !== undefined ? body.firstName : currentName[0] || '';
      const lastName = body.lastName !== undefined ? body.lastName : currentName.slice(1).join(' ') || '';
      updateData.name = `${firstName} ${lastName}`.trim();
    }
    if (body.email !== undefined) {
      // Check if email is already taken by another user
      const emailExists = await prisma.user.findFirst({
        where: {
          email: body.email,
          tenantId: user.tenantId,
          NOT: { id },
        },
      });

      if (emailExists) {
        return NextResponse.json(
          { error: 'Email already taken' },
          { status: 409 }
        );
      }
      updateData.email = body.email;
    }
    if (body.role !== undefined && user.role === 'ADMIN') {
      updateData.role = body.role;
    }
    if (body.isActive !== undefined && user.role === 'ADMIN') {
      updateData.isActive = body.isActive;
    }
    if (body.permissions !== undefined && user.role === 'ADMIN') {
      updateData.permissions = body.permissions;
    }

    // Hash password if provided
    if (body.password) {
      const bcrypt = await import('bcryptjs');
      updateData.password = await bcrypt.default.hash(body.password, 10);
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: updateData,
      include: {
        employee: true,
      },
    });

    // Remove password from response
    const { password, ...userWithoutPassword } = updatedUser;

    return NextResponse.json(
      formatSuccessResponse(userWithoutPassword, 'User updated successfully')
    );
  }, 'Failed to update user');
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  return tryCatch(async () => {
    const { id } = await params;
    const user = await getCurrentUser();
    if (!user?.tenantId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Check if user has admin role
    if (user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Insufficient permissions' },
        { status: 403 }
      );
    }

    // Prevent self-deletion
    if (user.id === id) {
      return NextResponse.json(
        { error: 'Cannot delete your own account' },
        { status: 400 }
      );
    }

    const targetUser = await prisma.user.findFirst({
      where: {
        id,
        tenantId: user.tenantId,
      },
    });

    if (!targetUser) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    await prisma.user.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: 'User deleted successfully' },
      { status: 200 }
    );
  }, 'Failed to delete user');
}

