'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { WorkOrderList } from '@/components/manufacturing/WorkOrderList';
import { WorkOrderForm } from '@/components/manufacturing/WorkOrderForm';
import { ArrowLeft } from 'lucide-react';

interface WorkOrder {
  id: string;
  workOrderNumber: string;
  productId: string;
  product?: {
    id: string;
    name: string;
    sku: string;
  };
  quantityToManufacture: number;
  quantityProduced: number;
  startDate: Date;
  deadline?: Date;
  status: 'DRAFT' | 'CONFIRMED' | 'IN_PROGRESS' | 'DONE' | 'CANCELLED';
  createdAt: Date;
}

export default function WorkOrdersPage() {
  const [workOrders, setWorkOrders] = useState<WorkOrder[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [boms, setBOMs] = useState<any[]>([]);
  const [warehouses, setWarehouses] = useState<any[]>([]);
  const [viewMode, setViewMode] = useState<'list' | 'create' | 'edit'>('list');
  const [selectedWO, setSelectedWO] = useState<WorkOrder | null>(null);

  useEffect(() => {
    fetchWorkOrders();
    fetchProducts();
    fetchBOMs();
    fetchWarehouses();
  }, []);

  const fetchWorkOrders = async () => {
    const mockWOs: WorkOrder[] = [
      {
        id: '1',
        workOrderNumber: 'WO-001',
        productId: '1',
        product: { id: '1', name: 'Office Chair', sku: 'CHAIR-001' },
        quantityToManufacture: 100,
        quantityProduced: 45,
        startDate: new Date('2024-01-15'),
        deadline: new Date('2024-02-15'),
        status: 'IN_PROGRESS',
        createdAt: new Date('2024-01-10'),
      },
      {
        id: '2',
        workOrderNumber: 'WO-002',
        productId: '2',
        product: { id: '2', name: 'Computer Desk', sku: 'DESK-001' },
        quantityToManufacture: 50,
        quantityProduced: 50,
        startDate: new Date('2024-01-01'),
        deadline: new Date('2024-01-31'),
        status: 'DONE',
        createdAt: new Date('2023-12-28'),
      },
      {
        id: '3',
        workOrderNumber: 'WO-003',
        productId: '3',
        product: { id: '3', name: 'Filing Cabinet', sku: 'CAB-001' },
        quantityToManufacture: 25,
        quantityProduced: 0,
        startDate: new Date('2024-02-01'),
        status: 'CONFIRMED',
        createdAt: new Date('2024-01-25'),
      },
    ];
    setWorkOrders(mockWOs);
  };

  const fetchProducts = async () => {
    setProducts([
      { id: '1', name: 'Office Chair', sku: 'CHAIR-001' },
      { id: '2', name: 'Computer Desk', sku: 'DESK-001' },
      { id: '3', name: 'Filing Cabinet', sku: 'CAB-001' },
    ]);
  };

  const fetchBOMs = async () => {
    setBOMs([
      { id: '1', bomNumber: 'BOM-001', name: 'Standard Office Chair BOM' },
      { id: '2', bomNumber: 'BOM-002', name: 'Executive Desk Assembly' },
    ]);
  };

  const fetchWarehouses = async () => {
    setWarehouses([
      { id: '1', name: 'Main Warehouse', code: 'WH-MAIN' },
      { id: '2', name: 'Production Floor', code: 'WH-PROD' },
    ]);
  };

  const handleCreateWO = async (data: any) => {
    console.log('Creating work order:', data);
    await fetchWorkOrders();
    setViewMode('list');
  };

  const handleUpdateWO = async (data: any) => {
    console.log('Updating work order:', data);
    await fetchWorkOrders();
    setViewMode('list');
  };

  const handleEdit = (wo: WorkOrder) => {
    setSelectedWO(wo);
    setViewMode('edit');
  };

  const handleDelete = async (woId: string) => {
    setWorkOrders(workOrders.filter((wo) => wo.id !== woId));
  };

  const handleView = (wo: WorkOrder) => {
    setSelectedWO(wo);
    setViewMode('edit');
  };

  return (
    <div className="space-y-6 p-6">
      {viewMode === 'list' ? (
        <WorkOrderList
          workOrders={workOrders}
          onCreateNew={() => setViewMode('create')}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onView={handleView}
        />
      ) : (
        <div>
          <Button variant="ghost" onClick={() => setViewMode('list')} className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to List
          </Button>
          <h1 className="text-3xl font-bold mb-6">
            {viewMode === 'create' ? 'Create Work Order' : 'Edit Work Order'}
          </h1>
          <WorkOrderForm
            initialData={
              selectedWO
                ? {
                    ...selectedWO,
                    startDate: selectedWO.startDate.toISOString().split('T')[0],
                    deadline: selectedWO.deadline
                      ? selectedWO.deadline.toISOString().split('T')[0]
                      : undefined,
                  }
                : undefined
            }
            products={products}
            boms={boms}
            warehouses={warehouses}
            onSubmit={viewMode === 'create' ? handleCreateWO : handleUpdateWO}
            onCancel={() => setViewMode('list')}
          />
        </div>
      )}
    </div>
  );
}
