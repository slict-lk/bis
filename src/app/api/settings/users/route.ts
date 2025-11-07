import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import { formatSuccessResponse, formatPaginatedResponse } from '@/lib/error-handler';
import { tryCatch } from '@/lib/error-handler';

export async function GET(request: NextRequest) {
  return tryCatch(async () => {
    const user = await getCurrentUser();
    if (!user?.tenantId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search');
    const role = searchParams.get('role') as 'ADMIN' | 'MANAGER' | 'USER' | 'VIEWER' | null;
    const isActive = searchParams.get('isActive');

    const skip = (page - 1) * limit;

    const where: any = {
      tenantId: user.tenantId,
    };

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (role) {
      where.role = role;
    }

    if (isActive !== null) {
      where.isActive = isActive === 'true';
    }

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        include: {
          employee: {
            select: {
              id: true,
              department: true,
            },
          },
        },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.user.count({ where }),
    ]);

    return NextResponse.json(
      formatPaginatedResponse(users, page, limit, total)
    );
  }, 'Failed to fetch users');
}

export async function POST(request: NextRequest) {
  return tryCatch(async () => {
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

    const body = await request.json();

    // Validate required fields
    if (!body.email || !body.firstName || !body.lastName) {
      return NextResponse.json(
        { error: 'Email, first name, and last name are required' },
        { status: 400 }
      );
    }

    // Check if user with this email already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        email: body.email,
        tenantId: user.tenantId,
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      );
    }

    // Password is required - generate temporary password if not provided
    let hashedPassword: string;
    if (body.password) {
      const bcrypt = await import('bcryptjs');
      hashedPassword = await bcrypt.default.hash(body.password, 10);
    } else {
      // Generate a random temporary password
      const bcrypt = await import('bcryptjs');
      const crypto = await import('crypto');
      const tempPassword = crypto.randomBytes(16).toString('hex');
      hashedPassword = await bcrypt.default.hash(tempPassword, 10);
    }

    // Construct full name from firstName and lastName
    const fullName = `${body.firstName} ${body.lastName}`.trim();

    const newUser = await prisma.user.create({
      data: {
        email: body.email,
        name: fullName,
        password: hashedPassword,
        tenantId: user.tenantId,
        isActive: body.isActive !== undefined ? body.isActive : true,
      },
      include: {
        employee: true,
        role: true,
      },
    });

    // Remove password from response
    const { password, ...userWithoutPassword } = newUser;

    return NextResponse.json(
      formatSuccessResponse(userWithoutPassword, 'User created successfully'),
      { status: 201 }
    );
  }, 'Failed to create user');
}
