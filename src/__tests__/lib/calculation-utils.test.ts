import { calculateLineTotal, calculateTotals } from '@/lib/calculation-utils';

describe('Calculation Utils', () => {
  describe('calculateLineTotal', () => {
    it('calculates line total with no discount or tax', () => {
      const result = calculateLineTotal(2, 100, 0, 0);
      expect(result).toBe(200); // 2 * 100 = 200
    });

    it('calculates line total with discount', () => {
      const result = calculateLineTotal(1, 100, 10, 0);
      expect(result).toBe(90); // 100 - 10% discount = 90
    });

    it('calculates line total with tax', () => {
      const result = calculateLineTotal(1, 100, 0, 10);
      expect(result).toBe(110); // 100 + 10% tax = 110
    });

    it('calculates line total with discount and tax', () => {
      const result = calculateLineTotal(1, 100, 10, 10);
      // 100 - 10% discount = 90, then + 10% tax = 99
      expect(result).toBe(99);
    });
  });

  describe('calculateTotals', () => {
    it('calculates totals for multiple lines', () => {
      const lines = [
        { quantity: 2, unitPrice: 100, discount: 0, tax: 0 },
        { quantity: 1, unitPrice: 50, discount: 10, tax: 5 },
      ];

      const result = calculateTotals(lines);

      expect(result.subtotal).toBe(250); // 200 + 50
      expect(result.totalDiscount).toBe(5); // 10% of 50
      expect(result.totalTax).toBe(2.25); // 5% of 45 (50 - 5)
      expect(result.total).toBe(247.25); // 250 - 5 + 2.25
    });

    it('handles empty lines array', () => {
      const result = calculateTotals([]);
      expect(result.subtotal).toBe(0);
      expect(result.totalDiscount).toBe(0);
      expect(result.totalTax).toBe(0);
      expect(result.total).toBe(0);
    });
  });
});
