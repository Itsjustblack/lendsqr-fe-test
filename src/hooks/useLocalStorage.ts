import { useState, useEffect } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
	const readValue = (): T => {
		if (typeof window === "undefined") return initialValue;

		try {
			const item = window.localStorage.getItem(key);
			return item ? (JSON.parse(item) as T) : initialValue;
		} catch (error) {
			console.warn(`Error reading localStorage key "${key}":`, error);
			return initialValue;
		}
	};

	const [storedValue, setStoredValue] = useState<T>(readValue);

	// Update localStorage when the storedValue changes
	useEffect(() => {
		try {
			window.localStorage.setItem(key, JSON.stringify(storedValue));
		} catch (error) {
			console.warn(`Error setting localStorage key "${key}":`, error);
		}
	}, [key, storedValue]);

	// Sync across tabs/windows
	useEffect(() => {
		const handleStorageChange = (event: StorageEvent) => {
			if (event.key === key) {
				setStoredValue(
					event.newValue ? JSON.parse(event.newValue) : initialValue
				);
			}
		};

		window.addEventListener("storage", handleStorageChange);
		return () => window.removeEventListener("storage", handleStorageChange);
	}, [key, initialValue]);

	return [storedValue, setStoredValue] as const;
}
