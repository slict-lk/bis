'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { BillOfMaterialsList } from '@/components/manufacturing/BillOfMaterialsList';
import { ArrowLeft } from 'lucide-react';

interface BOM {
  id: string;
  bomNumber: string;
  productId: string;
  product?: {
    id: string;
    name: string;
    sku: string;
  };
  name: string;
  type: 'MANUFACTURING' | 'KIT';
  quantity: number;
  isActive: boolean;
  _count?: {
    lines: number;
  };
}

export default function BOMPage() {
  const [boms, setBOMs] = useState<BOM[]>([]);
  const [viewMode, setViewMode] = useState<'list' | 'create' | 'edit'>('list');
  const [selectedBOM, setSelectedBOM] = useState<BOM | null>(null);

  useEffect(() => {
    fetchBOMs();
  }, []);

  const fetchBOMs = async () => {
    // Simulated data - replace with actual API call
    const mockBOMs: BOM[] = [
      {
        id: '1',
        bomNumber: 'BOM-001',
        productId: '1',
        product: { id: '1', name: 'Office Chair', sku: 'CHAIR-001' },
        name: 'Standard Office Chair BOM',
        type: 'MANUFACTURING',
        quantity: 1,
        isActive: true,
        _count: { lines: 12 },
      },
      {
        id: '2',
        bomNumber: 'BOM-002',
        productId: '2',
        product: { id: '2', name: 'Computer Desk', sku: 'DESK-001' },
        name: 'Executive Desk Assembly',
        type: 'MANUFACTURING',
        quantity: 1,
        isActive: true,
        _count: { lines: 8 },
      },
      {
        id: '3',
        bomNumber: 'BOM-003',
        productId: '3',
        product: { id: '3', name: 'Welcome Kit', sku: 'KIT-001' },
        name: 'New Employee Welcome Kit',
        type: 'KIT',
        quantity: 1,
        isActive: true,
        _count: { lines: 5 },
      },
    ];
    setBOMs(mockBOMs);
  };

  const handleCreateNew = () => {
    setSelectedBOM(null);
    setViewMode('create');
  };

  const handleEdit = (bom: BOM) => {
    setSelectedBOM(bom);
    setViewMode('edit');
  };

  const handleDelete = async (bomId: string) => {
    // TODO: Implement actual API call
    setBOMs(boms.filter((b) => b.id !== bomId));
  };

  const handleView = (bom: BOM) => {
    setSelectedBOM(bom);
    setViewMode('edit');
  };

  return (
    <div className="space-y-6 p-6">
      {viewMode === 'list' ? (
        <BillOfMaterialsList
          boms={boms}
          onCreateNew={handleCreateNew}
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
            {viewMode === 'create' ? 'Create Bill of Materials' : 'Edit Bill of Materials'}
          </h1>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-sm text-yellow-800">
              BOM Form component integration pending. This would include:
              <ul className="list-disc ml-6 mt-2">
                <li>Product selection</li>
                <li>BOM type (Manufacturing/Kit)</li>
                <li>Component lines with quantities</li>
                <li>Scrap factor calculations</li>
              </ul>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
