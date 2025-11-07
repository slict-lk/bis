import { POST } from './route';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/session';

jest.mock('@/lib/prisma', () => ({
  tenant: {
    findUnique: jest.fn(),
    update: jest.fn()
  }
}));

jest.mock('@/lib/session', () => ({
  getCurrentUser: jest.fn()
}));

describe('Appearance Settings API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should update settings successfully', async () => {
    (getCurrentUser as jest.Mock).mockResolvedValue({
      id: 'user-1',
      tenantId: 'tenant-1'
    });

    (prisma.tenant.findUnique as jest.Mock).mockResolvedValue({
      id: 'tenant-1',
      settings: {}
    });
    
    (prisma.tenant.update as jest.Mock).mockResolvedValue({
      id: 'tenant-1',
      primaryColor: '#2563eb',
      settings: {
        theme: 'dark',
        borderRadius: 8
      }
    });

    const req = {
      json: async () => ({
        theme: 'dark',
        primaryColor: '#2563eb',
        borderRadius: 8,
        compactMode: false,
        glassmorphism: true,
        headerBlur: 20
      })
    } as unknown as Request;

    const response = await POST(req);
    expect(response.status).toBe(200);
  });
});
