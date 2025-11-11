/**
 * Utility functions for testing localStorage
 */

/**
 * Set an item in localStorage with JSON serialization
 */
export function setLocalStorageItem<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value));
}

/**
 * Get an item from localStorage with JSON parsing
 */
export function getLocalStorageItem<T>(key: string): T | null {
  const item = localStorage.getItem(key);
  if (!item) return null;

  try {
    return JSON.parse(item) as T;
  } catch {
    return null;
  }
}

/**
 * Clear all items from localStorage
 */
export function clearLocalStorage(): void {
  localStorage.clear();
}

/**
 * Remove a specific item from localStorage
 */
export function removeLocalStorageItem(key: string): void {
  localStorage.removeItem(key);
}

/**
 * Check if a key exists in localStorage
 */
export function hasLocalStorageItem(key: string): boolean {
  return localStorage.getItem(key) !== null;
}

/**
 * Get all keys from localStorage
 */
export function getAllLocalStorageKeys(): string[] {
  return Object.keys(localStorage);
}
