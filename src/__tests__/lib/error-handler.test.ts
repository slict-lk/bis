import { formatErrorResponse, formatSuccessResponse } from '@/lib/error-handler';

describe('Error Handler', () => {
  describe('formatSuccessResponse', () => {
    it('formats successful responses correctly', () => {
      const data = { id: 1, name: 'Test' };
      const result = formatSuccessResponse(data, 'Success message');

      expect(result.success).toBe(true);
      expect(result.data).toEqual(data);
      expect(result.message).toBe('Success message');
      expect(result.timestamp).toBeDefined();
    });

    it('formats responses without message', () => {
      const data = { id: 1 };
      const result = formatSuccessResponse(data);

      expect(result.success).toBe(true);
      expect(result.data).toEqual(data);
      expect(result.message).toBeUndefined();
      expect(result.timestamp).toBeDefined();
    });
  });

  describe('formatErrorResponse', () => {
    it('formats error responses from Error objects', () => {
      const error = new Error('Test error');
      const result = formatErrorResponse(error);

      expect(result.success).toBe(false);
      expect(result.error.message).toBe('Test error');
      expect(result.error.statusCode).toBe(500);
      expect(result.error.code).toBe('INTERNAL_ERROR');
      expect(result.error.timestamp).toBeDefined();
    });

    it('formats error responses from AppError objects', () => {
      const error = new Error('Validation failed');
      error.name = 'ValidationError';
      const result = formatErrorResponse(error);

      expect(result.success).toBe(false);
      expect(result.error.message).toBe('Validation failed');
    });
  });
});
