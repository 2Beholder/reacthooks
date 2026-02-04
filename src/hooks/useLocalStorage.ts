import { useState } from 'react';

/**
 * useLocalStorage - Persist state in localStorage
 * 
 * @param key - The localStorage key
 * @param initialValue - The initial value if key doesn't exist
 * @returns A tuple of [value, setValue] similar to useState
 */
export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  // Get initial value from localStorage or use the provided initial value
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Update localStorage when state changes
  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
}
