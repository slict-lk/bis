import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import { formatSuccessResponse } from '@/lib/error-handler';
import { tryCatch } from '@/lib/error-handler';

type BusinessHourEntry = {
  day: string;
  isOpen: boolean;
  openTime: string;
  closeTime: string;
};

type TenantSettings = {
  registrationNumber?: string;
  industry?: string;
  foundedYear?: string;
  website?: string;
  description?: string;
  email?: string;
  phone?: string;
  fax?: string;
  address?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  taxId?: string;
  vatNumber?: string;
  bankName?: string;
  accountName?: string;
  accountNumber?: string;
  routingNumber?: string;
  iban?: string;
  swiftCode?: string;
  facebook?: string;
  twitter?: string;
  linkedin?: string;
  instagram?: string;
  businessHours?: BusinessHourEntry[];
  logo?: string;
  signature?: string;
  termsAndConditions?: string;
  privacyPolicy?: string;
  [key: string]: unknown;
};

const DEFAULT_BUSINESS_HOURS: BusinessHourEntry[] = [
  { day: 'Monday', isOpen: true, openTime: '09:00', closeTime: '17:00' },
  { day: 'Tuesday', isOpen: true, openTime: '09:00', closeTime: '17:00' },
  { day: 'Wednesday', isOpen: true, openTime: '09:00', closeTime: '17:00' },
  { day: 'Thursday', isOpen: true, openTime: '09:00', closeTime: '17:00' },
  { day: 'Friday', isOpen: true, openTime: '09:00', closeTime: '17:00' },
  { day: 'Saturday', isOpen: false, openTime: '09:00', closeTime: '13:00' },
  { day: 'Sunday', isOpen: false, openTime: '', closeTime: '' },
];

function normalizeCompanyResponse(tenant: Tenant | null) {
  const rawSettings = (tenant?.settings ?? {}) as TenantSettings;
  const settings = typeof rawSettings === 'object' && rawSettings !== null ? rawSettings : {};

  const businessHours = Array.isArray(settings.businessHours) && settings.businessHours.length > 0
    ? settings.businessHours.map((entry: Partial<BusinessHourEntry>) => ({
        day: entry?.day ?? '',
        isOpen: Boolean(entry?.isOpen),
        openTime: entry?.openTime ?? '',
        closeTime: entry?.closeTime ?? '',
      }))
    : DEFAULT_BUSINESS_HOURS.map((entry) => ({ ...entry }));

  return {
    companyName: tenant?.companyName || tenant?.name || '',
    legalName: tenant?.companyName || tenant?.name || '',
    registrationNumber: settings.registrationNumber ?? '',
    industry: settings.industry ?? '',
    foundedYear: settings.foundedYear ?? '',
    website: settings.website ?? tenant?.domain ?? '',
    description: settings.description ?? '',
    email: settings.email ?? '',
    phone: settings.phone ?? '',
    fax: settings.fax ?? '',
    address: settings.address ?? '',
    city: settings.city ?? '',
    state: settings.state ?? '',
    postalCode: settings.postalCode ?? '',
    country: settings.country ?? 'US',
    taxId: settings.taxId ?? '',
    vatNumber: settings.vatNumber ?? '',
    bankName: settings.bankName ?? '',
    accountName: settings.accountName ?? '',
    accountNumber: settings.accountNumber ?? '',
    routingNumber: settings.routingNumber ?? '',
    iban: settings.iban ?? '',
    swiftCode: settings.swiftCode ?? '',
    facebook: settings.facebook ?? '',
    twitter: settings.twitter ?? '',
    linkedin: settings.linkedin ?? '',
    instagram: settings.instagram ?? '',
    businessHours,
    logo: tenant?.logo ?? settings.logo ?? '',
    signature: settings.signature ?? '',
    termsAndConditions: settings.termsAndConditions ?? '',
    privacyPolicy: settings.privacyPolicy ?? '',
  };
}

export async function GET(request: NextRequest) {
  return tryCatch(async () => {
    const user = await getCurrentUser();
    if (!user?.tenantId) {
      return NextResponse.json(
        { error: 'Unauthorized - Please log in again' },
        { status: 401 }
      );
    }

    const tenant = await prisma.tenant.findUnique({
      where: { id: user.tenantId },
    });

    if (!tenant) {
      return NextResponse.json(
        { error: 'Company not found' },
        { status: 404 }
      );
    }

    // Parse the settings JSON
    const settings = tenant.settings as TenantSettings || {};

    // Initialize with default values, using tenant data where available
    const responseData = {
      companyName: tenant.companyName || '',
      legalName: tenant.name || '',
      registrationNumber: settings.registrationNumber || '',
      industry: settings.industry || '',
      foundedYear: settings.foundedYear || new Date().getFullYear().toString(),
      website: tenant.domain || '',
      description: settings.description || '',
      email: settings.email || '',
      phone: settings.phone || '',
      fax: settings.fax || '',
      address: settings.address || '',
      city: settings.city || '',
      state: settings.state || '',
      postalCode: settings.postalCode || '',
      country: settings.country || 'US',
      taxId: settings.taxId || '',
      vatNumber: settings.vatNumber || '',
      bankName: settings.bankName || '',
      accountName: settings.accountName || '',
      accountNumber: settings.accountNumber || '',
      routingNumber: settings.routingNumber || '',
      iban: settings.iban || '',
      businessHours: settings.businessHours || DEFAULT_BUSINESS_HOURS,
      logo: tenant.logo || '',
      primaryColor: tenant.primaryColor,
    };

    return NextResponse.json(responseData);
  }, 'Failed to fetch company settings');
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

    const body = await request.json() as Record<string, unknown>;

    // Extract tenant basic info
    const tenantUpdate = {
      companyName: body.companyName as string,
      name: body.legalName as string,
      domain: body.website as string,
      logo: body.logo as string,
    };

    // Extract settings data
    const settings: TenantSettings = {
      registrationNumber: body.registrationNumber as string,
      industry: body.industry as string,
      foundedYear: body.foundedYear as string,
      description: body.description as string,
      email: body.email as string,
      phone: body.phone as string,
      fax: body.fax as string,
      address: body.address as string,
      city: body.city as string,
      state: body.state as string,
      postalCode: body.postalCode as string,
      country: body.country as string,
      taxId: body.taxId as string,
      vatNumber: body.vatNumber as string,
      bankName: body.bankName as string,
      accountName: body.accountName as string,
      accountNumber: body.accountNumber as string,
      routingNumber: body.routingNumber as string,
      iban: body.iban as string,
      businessHours: body.businessHours as BusinessHourEntry[],
    };

    // Update tenant with both basic info and settings
    const updatedTenant = await prisma.tenant.update({
      where: { id: user.tenantId },
      data: {
        ...tenantUpdate,
        settings: settings,
      },
    });

    if (!updatedTenant) {
      return NextResponse.json(
        { error: 'Failed to update company settings' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      formatSuccessResponse({}, 'Company settings saved successfully')
    );
  }, 'Failed to save company settings');
}
