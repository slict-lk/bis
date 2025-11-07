// Simple test to verify Jest is working
describe('ERP System Tests', () => {
  test('basic arithmetic works', () => {
    expect(1 + 1).toBe(2);
  });

  test('string operations work', () => {
    expect('hello world').toContain('world');
  });

  test('boolean operations work', () => {
    expect(true).toBeTruthy();
    expect(false).toBeFalsy();
  });
});

// Test utility functions directly without complex imports
describe('Simple Utility Tests', () => {
  test('math operations', () => {
    const add = (a: number, b: number) => a + b;
    const multiply = (a: number, b: number) => a * b;

    expect(add(2, 3)).toBe(5);
    expect(multiply(4, 5)).toBe(20);
  });

  test('string formatting', () => {
    const formatCurrency = (amount: number) => `$${amount.toFixed(2)}`;

    expect(formatCurrency(10)).toBe('$10.00');
    expect(formatCurrency(10.5)).toBe('$10.50');
    expect(formatCurrency(100.99)).toBe('$100.99');
  });
});
