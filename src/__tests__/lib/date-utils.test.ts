import {
  formatDateForInput,
  formatDate,
  getRelativeTime,
  isToday,
  addDays,
  getDateRange
} from '@/lib/date-utils';

describe('Date Utils', () => {
  describe('formatDateForInput', () => {
    it('formats date for HTML input', () => {
      const date = new Date('2024-01-15T10:30:00Z');
      expect(formatDateForInput(date)).toBe('2024-01-15');
    });

    it('handles string dates', () => {
      expect(formatDateForInput('2024-01-15')).toBe('2024-01-15');
    });

    it('returns empty string for undefined', () => {
      expect(formatDateForInput(undefined)).toBe('');
    });
  });

  describe('formatDate', () => {
    it('formats date for display', () => {
      const date = new Date('2024-01-15T10:30:00Z');
      const result = formatDate(date);
      expect(result).toMatch(/Jan 15, 2024|15 Jan 2024/); // Format may vary by locale
    });
  });

  describe('getRelativeTime', () => {
    it('returns "just now" for current time', () => {
      const now = new Date();
      expect(getRelativeTime(now)).toBe('just now');
    });

    it('returns minutes ago for recent times', () => {
      const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
      expect(getRelativeTime(fiveMinutesAgo)).toContain('minute');
    });

    it('returns future times correctly', () => {
      const fiveMinutesFuture = new Date(Date.now() + 5 * 60 * 1000);
      expect(getRelativeTime(fiveMinutesFuture)).toContain('minute');
    });
  });

  describe('isToday', () => {
    it('returns true for today', () => {
      const today = new Date();
      expect(isToday(today)).toBe(true);
    });

    it('returns false for other days', () => {
      const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
      expect(isToday(yesterday)).toBe(false);
    });
  });

  describe('addDays', () => {
    it('adds days correctly', () => {
      const date = new Date('2024-01-15');
      const result = addDays(date, 5);
      expect(result.getDate()).toBe(20); // Jan 15 + 5 = Jan 20
    });
  });

  describe('getDateRange', () => {
    it('returns correct range for today', () => {
      const range = getDateRange('today');
      const today = new Date();

      expect(range.start.toDateString()).toBe(today.toDateString());
      expect(range.end.toDateString()).toBe(today.toDateString());
    });

    it('returns correct range for week', () => {
      const range = getDateRange('week');
      const today = new Date();
      const weekStart = new Date(today);
      weekStart.setDate(today.getDate() - today.getDay());

      expect(range.start.toDateString()).toBe(weekStart.toDateString());
    });
  });
});
