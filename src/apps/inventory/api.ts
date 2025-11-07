// Inventory & Operations API Functions
import prisma from '@/lib/prisma';
import type { Product, Warehouse, StockMove, PurchaseOrder } from './types';

export async function getProducts(tenantId: string) {
  return await prisma.product.findMany({
    where: { tenantId },
    include: { category: true },
    orderBy: { name: 'asc' },
  });
}

export async function createProduct(data: Partial<Product> & { tenantId: string }) {
  return await prisma.product.create({
    data: {
      sku: data.sku!,
      name: data.name!,
      description: data.description,
      type: data.type || 'STORABLE',
      listPrice: data.listPrice!,
      costPrice: data.costPrice,
      qtyAvailable: data.qtyAvailable || 0,
      qtyReserved: data.qtyReserved || 0,
      barcode: data.barcode,
      weight: data.weight,
      volume: data.volume,
      isActive: data.isActive !== undefined ? data.isActive : true,
      canBeSold: data.canBeSold !== undefined ? data.canBeSold : true,
      canBePurchased: data.canBePurchased !== undefined ? data.canBePurchased : true,
      categoryId: data.categoryId,
      tenantId: data.tenantId,
    },
  });
}

export async function getWarehouses(tenantId: string) {
  return await prisma.warehouse.findMany({
    where: { tenantId },
    orderBy: { name: 'asc' },
  });
}

export async function getStockMoves(tenantId: string) {
  return await prisma.stockMove.findMany({
    where: { tenantId },
    include: {
      product: true,
      warehouse: true,
    },
    orderBy: { date: 'desc' },
  });
}

export async function getPurchaseOrders(tenantId: string) {
  return await prisma.purchaseOrder.findMany({
    where: { tenantId },
    orderBy: { orderDate: 'desc' },
  });
}
