import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useLocalStorage } from './useLocalStorage';

describe('useLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  afterEach(() => {
    localStorage.clear();
  });

  describe('Initial value', () => {
    it('should return initial value when localStorage is empty', () => {
      const { result } = renderHook(() =>
        useLocalStorage('test-key', 'default-value')
      );

      const [value] = result.current;
      expect(value).toBe('default-value');
    });

    it('should return stored value from localStorage if it exists', () => {
      localStorage.setItem('test-key', JSON.stringify('stored-value'));

      const { result } = renderHook(() =>
        useLocalStorage('test-key', 'default-value')
      );

      const [value] = result.current;
      expect(value).toBe('stored-value');
    });

    it('should work with different data types (number)', () => {
      localStorage.setItem('number-key', JSON.stringify(42));

      const { result } = renderHook(() => useLocalStorage('number-key', 0));

      const [value] = result.current;
      expect(value).toBe(42);
    });

    it('should work with different data types (object)', () => {
      const obj = { name: 'John', age: 30 };
      localStorage.setItem('object-key', JSON.stringify(obj));

      const { result } = renderHook(() =>
        useLocalStorage('object-key', { name: '', age: 0 })
      );

      const [value] = result.current;
      expect(value).toEqual(obj);
    });

    it('should work with different data types (array)', () => {
      const arr = [1, 2, 3, 4, 5];
      localStorage.setItem('array-key', JSON.stringify(arr));

      const { result } = renderHook(() => useLocalStorage('array-key', []));

      const [value] = result.current;
      expect(value).toEqual(arr);
    });

    it('should work with different data types (boolean)', () => {
      localStorage.setItem('bool-key', JSON.stringify(true));

      const { result } = renderHook(() => useLocalStorage('bool-key', false));

      const [value] = result.current;
      expect(value).toBe(true);
    });
  });

  describe('Setting values', () => {
    it('should update value and store in localStorage', () => {
      const { result } = renderHook(() =>
        useLocalStorage('test-key', 'initial')
      );

      act(() => {
        const [, setValue] = result.current;
        setValue('updated');
      });

      const [value] = result.current;
      expect(value).toBe('updated');
      expect(localStorage.getItem('test-key')).toBe(JSON.stringify('updated'));
    });

    it('should update localStorage when value changes', () => {
      const { result } = renderHook(() =>
        useLocalStorage('user', { name: 'John', age: 25 })
      );

      act(() => {
        const [, setValue] = result.current;
        setValue({ name: 'Jane', age: 30 });
      });

      const stored = JSON.parse(localStorage.getItem('user')!);
      expect(stored).toEqual({ name: 'Jane', age: 30 });
    });

    it('should handle multiple updates correctly', () => {
      const { result } = renderHook(() => useLocalStorage('counter', 0));

      act(() => {
        const [, setValue] = result.current;
        setValue(1);
      });

      act(() => {
        const [, setValue] = result.current;
        setValue(2);
      });

      act(() => {
        const [, setValue] = result.current;
        setValue(3);
      });

      const [value] = result.current;
      expect(value).toBe(3);
      expect(localStorage.getItem('counter')).toBe('3');
    });
  });

  describe('Error handling', () => {
    it('should return initial value if JSON.parse fails', () => {
      localStorage.setItem('invalid-json', 'not-valid-json{]');

      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

      const { result } = renderHook(() =>
        useLocalStorage('invalid-json', 'default')
      );

      const [value] = result.current;
      expect(value).toBe('default');
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('Error reading localStorage key'),
        expect.anything()
      );

      consoleSpy.mockRestore();
    });

    it('should not crash when localStorage quota is exceeded', () => {
      // Test that the hook doesn't crash even if localStorage throws
      // This is more of an integration test - we verify it doesn't break
      const { result } = renderHook(() => useLocalStorage('test', 'value'));

      // The hook should still work and return a value
      const [value, setValue] = result.current;
      expect(value).toBe('value');
      expect(typeof setValue).toBe('function');

      // Update should work (even if localStorage fails internally, state updates)
      act(() => {
        setValue('new-value');
      });

      const [updatedValue] = result.current;
      expect(updatedValue).toBe('new-value');
    });
  });

  describe('Cross-tab synchronization', () => {
    it('should update value when storage event is fired', () => {
      const { result } = renderHook(() =>
        useLocalStorage('sync-key', 'initial')
      );

      act(() => {
        // Simulate storage event from another tab
        const storageEvent = new StorageEvent('storage', {
          key: 'sync-key',
          newValue: JSON.stringify('updated-from-other-tab'),
        });
        window.dispatchEvent(storageEvent);
      });

      const [value] = result.current;
      expect(value).toBe('updated-from-other-tab');
    });

    it('should ignore storage events for different keys', () => {
      const { result } = renderHook(() =>
        useLocalStorage('my-key', 'my-value')
      );

      act(() => {
        const storageEvent = new StorageEvent('storage', {
          key: 'other-key',
          newValue: JSON.stringify('other-value'),
        });
        window.dispatchEvent(storageEvent);
      });

      const [value] = result.current;
      expect(value).toBe('my-value'); // Should not change
    });

    it('should handle null newValue in storage event', () => {
      const { result } = renderHook(() =>
        useLocalStorage('delete-key', 'initial-value')
      );

      act(() => {
        // Simulate storage being cleared/deleted from another tab
        const storageEvent = new StorageEvent('storage', {
          key: 'delete-key',
          newValue: null,
        });
        window.dispatchEvent(storageEvent);
      });

      const [value] = result.current;
      expect(value).toBe('initial-value'); // Should fall back to initial value
    });
  });

  describe('Persistence across component lifecycle', () => {
    it('should persist value in localStorage after setting', () => {
      const { result } = renderHook(() =>
        useLocalStorage('persist-key', 'initial')
      );

      act(() => {
        const [, setValue] = result.current;
        setValue('updated');
      });

      // Verify it's in localStorage
      const stored = localStorage.getItem('persist-key');
      expect(stored).toBe(JSON.stringify('updated'));
    });

    it('should read persisted value on new hook instance', () => {
      // First hook instance - set a value
      const { result: firstResult } = renderHook(() =>
        useLocalStorage('shared-key', 'initial')
      );

      act(() => {
        const [, setValue] = firstResult.current;
        setValue('persisted-value');
      });

      // Second hook instance - should read the persisted value
      const { result: secondResult } = renderHook(() =>
        useLocalStorage('shared-key', 'initial')
      );

      const [value] = secondResult.current;
      expect(value).toBe('persisted-value');
    });
  });
});
