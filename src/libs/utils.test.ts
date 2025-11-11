import { describe, it, expect } from 'vitest';
import { formatDate, flattenQueryParams, generatePageNumbers } from './utils';
import { ELLIPSIS } from './constants';
import type { QueryParams } from '@/types/user';

describe('formatDate', () => {
  it('should format date correctly with AM time', () => {
    const date = new Date('2024-01-15T10:30:00');
    const formatted = formatDate(date);
    expect(formatted).toBe('Jan 15, 2024 10:30 AM');
  });

  it('should format date correctly with PM time', () => {
    const date = new Date('2024-03-20T14:45:00');
    const formatted = formatDate(date);
    expect(formatted).toBe('Mar 20, 2024 2:45 PM');
  });

  it('should format midnight (12:00 AM) correctly', () => {
    const date = new Date('2024-05-10T00:00:00');
    const formatted = formatDate(date);
    expect(formatted).toBe('May 10, 2024 12:00 AM');
  });

  it('should format noon (12:00 PM) correctly', () => {
    const date = new Date('2024-07-04T12:00:00');
    const formatted = formatDate(date);
    expect(formatted).toBe('Jul 4, 2024 12:00 PM');
  });

  it('should pad single-digit minutes with zero', () => {
    const date = new Date('2024-02-28T08:05:00');
    const formatted = formatDate(date);
    expect(formatted).toBe('Feb 28, 2024 8:05 AM');
  });

  it('should handle all months correctly', () => {
    const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];

    months.forEach((month, index) => {
      const date = new Date(2024, index, 15, 10, 30);
      const formatted = formatDate(date);
      expect(formatted).toContain(month);
    });
  });

  describe('Error Handling - Negative Scenarios', () => {
    it('should handle null date input', () => {
      const formatted = formatDate(null as any);
      // Should either return empty string, "Invalid Date", or throw error
      expect(typeof formatted).toBe('string');
    });

    it('should handle undefined date input', () => {
      const formatted = formatDate(undefined as any);
      // Should either return empty string, "Invalid Date", or throw error
      expect(typeof formatted).toBe('string');
    });

    it('should handle invalid Date object', () => {
      const invalidDate = new Date('invalid');
      const formatted = formatDate(invalidDate);
      // Should handle invalid date gracefully
      expect(typeof formatted).toBe('string');
    });

    it('should handle non-Date object input', () => {
      const notADate = { year: 2024, month: 1, day: 15 } as any;
      const formatted = formatDate(notADate);
      // Should handle non-Date input gracefully
      expect(typeof formatted).toBe('string');
    });
  });
});

describe('flattenQueryParams', () => {
  it('should flatten filters and pagination into single object', () => {
    const params: QueryParams = {
      filters: {
        username: 'john_doe',
        email: 'john@example.com',
        status: 'active',
      },
      pagination: {
        page: 2,
        pageSize: 20,
      },
    };

    const flattened = flattenQueryParams(params);

    expect(flattened).toEqual({
      username: 'john_doe',
      email: 'john@example.com',
      status: 'active',
      page: 2,
      pageSize: 20,
    });
  });

  it('should handle params with only filters', () => {
    const params: QueryParams = {
      filters: {
        organization: 'Lendsqr',
        status: 'pending',
      },
    };

    const flattened = flattenQueryParams(params);

    expect(flattened).toEqual({
      organization: 'Lendsqr',
      status: 'pending',
    });
  });

  it('should handle params with only pagination', () => {
    const params: QueryParams = {
      pagination: {
        page: 5,
        pageSize: 50,
      },
    };

    const flattened = flattenQueryParams(params);

    expect(flattened).toEqual({
      page: 5,
      pageSize: 50,
    });
  });

  it('should return empty object when params is undefined', () => {
    const flattened = flattenQueryParams(undefined);
    expect(flattened).toEqual({});
  });

  it('should return empty object when params has no filters or pagination', () => {
    const params: QueryParams = {};
    const flattened = flattenQueryParams(params);
    expect(flattened).toEqual({});
  });
});

describe('generatePageNumbers', () => {
  it('should return empty array for 0 pages', () => {
    const pages = generatePageNumbers(0, 1);
    expect(pages).toEqual([]);
  });

  it('should return all page numbers when pageCount <= 7', () => {
    const pages = generatePageNumbers(5, 3);
    expect(pages).toEqual([1, 2, 3, 4, 5]);
  });

  it('should show first 4 pages, ellipsis, and last page when on page 1', () => {
    const pages = generatePageNumbers(10, 1);
    expect(pages).toEqual([1, 2, 3, 4, ELLIPSIS, 10]);
  });

  it('should show first 4 pages, ellipsis, and last page when on page 2', () => {
    const pages = generatePageNumbers(10, 2);
    expect(pages).toEqual([1, 2, 3, 4, ELLIPSIS, 10]);
  });

  it('should show first 4 pages, ellipsis, and last page when on page 3', () => {
    const pages = generatePageNumbers(10, 3);
    expect(pages).toEqual([1, 2, 3, 4, ELLIPSIS, 10]);
  });

  it('should show first page, ellipsis, last 4 pages when on last page', () => {
    const pages = generatePageNumbers(10, 10);
    expect(pages).toEqual([1, ELLIPSIS, 7, 8, 9, 10]);
  });

  it('should show first page, ellipsis, last 4 pages when on second-to-last page', () => {
    const pages = generatePageNumbers(10, 9);
    expect(pages).toEqual([1, ELLIPSIS, 7, 8, 9, 10]);
  });

  it('should show first page, ellipsis, last 4 pages when on page 8 of 10', () => {
    const pages = generatePageNumbers(10, 8);
    expect(pages).toEqual([1, ELLIPSIS, 7, 8, 9, 10]);
  });

  it('should show current page with context in middle (page 5 of 10)', () => {
    const pages = generatePageNumbers(10, 5);
    expect(pages).toEqual([1, ELLIPSIS, 4, 5, 6, ELLIPSIS, 10]);
  });

  it('should show current page with context in middle (page 6 of 10)', () => {
    const pages = generatePageNumbers(10, 6);
    expect(pages).toEqual([1, ELLIPSIS, 5, 6, 7, ELLIPSIS, 10]);
  });

  it('should handle large page counts correctly', () => {
    const pages = generatePageNumbers(50, 25);
    expect(pages).toEqual([1, ELLIPSIS, 24, 25, 26, ELLIPSIS, 50]);
  });

  it('should handle exactly 7 pages (boundary case)', () => {
    const pages = generatePageNumbers(7, 4);
    expect(pages).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });

  it('should handle exactly 8 pages (just over threshold)', () => {
    const pages = generatePageNumbers(8, 1);
    expect(pages).toEqual([1, 2, 3, 4, ELLIPSIS, 8]);
  });

  describe('Error Handling - Negative Scenarios', () => {
    it('should handle negative current page', () => {
      const pages = generatePageNumbers(10, -1);
      // Should either return empty array, treat as 1, or handle gracefully
      expect(Array.isArray(pages)).toBe(true);
    });

    it('should handle current page greater than page count', () => {
      const pages = generatePageNumbers(10, 15);
      // Should handle gracefully - possibly clamp to max page
      expect(Array.isArray(pages)).toBe(true);
    });

    it('should handle zero page count', () => {
      const pages = generatePageNumbers(0, 1);
      // Should return empty array
      expect(pages).toEqual([]);
    });

    it('should handle NaN as current page', () => {
      const pages = generatePageNumbers(10, NaN);
      // Should handle gracefully
      expect(Array.isArray(pages)).toBe(true);
    });

    it('should handle Infinity as page count', () => {
      const pages = generatePageNumbers(Infinity, 1);
      // Should handle gracefully - possibly return empty or limited range
      expect(Array.isArray(pages)).toBe(true);
    });

    it('should handle negative page count', () => {
      const pages = generatePageNumbers(-5, 1);
      // Should handle gracefully - possibly return empty array
      expect(Array.isArray(pages)).toBe(true);
    });
  });
});
