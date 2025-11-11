import { describe, it, expect, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useIsMenuOpen, useMobileMenuActions } from "./mobileMenu";

describe("Mobile Menu Store", () => {
	// Reset store before each test by closing the menu
	beforeEach(() => {
		const { result } = renderHook(() => useMobileMenuActions());
		act(() => {
			result.current.closeMenu();
		});
	});

	describe("Initial state", () => {
		it("should be closed initially", () => {
			const { result } = renderHook(() => useIsMenuOpen());
			expect(result.current).toBe(false);
		});
	});

	describe("Menu actions", () => {
		it("should open the menu", () => {
			const { result: isOpenResult } = renderHook(() => useIsMenuOpen());
			const { result: actionsResult } = renderHook(() =>
				useMobileMenuActions()
			);

			act(() => {
				actionsResult.current.openMenu();
			});

			expect(isOpenResult.current).toBe(true);
		});

		it("should close the menu", () => {
			const { result: isOpenResult } = renderHook(() => useIsMenuOpen());
			const { result: actionsResult } = renderHook(() =>
				useMobileMenuActions()
			);

			// First open it
			act(() => {
				actionsResult.current.openMenu();
			});
			expect(isOpenResult.current).toBe(true);

			// Then close it
			act(() => {
				actionsResult.current.closeMenu();
			});
			expect(isOpenResult.current).toBe(false);
		});

		it("should toggle the menu from closed to open", () => {
			const { result: isOpenResult } = renderHook(() => useIsMenuOpen());
			const { result: actionsResult } = renderHook(() =>
				useMobileMenuActions()
			);

			// Initially closed
			expect(isOpenResult.current).toBe(false);

			// Toggle to open
			act(() => {
				actionsResult.current.toggleMenu();
			});
			expect(isOpenResult.current).toBe(true);
		});

		it("should toggle the menu from open to closed", () => {
			const { result: isOpenResult } = renderHook(() => useIsMenuOpen());
			const { result: actionsResult } = renderHook(() =>
				useMobileMenuActions()
			);

			// First open it
			act(() => {
				actionsResult.current.openMenu();
			});
			expect(isOpenResult.current).toBe(true);

			// Toggle to close
			act(() => {
				actionsResult.current.toggleMenu();
			});
			expect(isOpenResult.current).toBe(false);
		});

		it("should toggle menu multiple times", () => {
			const { result: isOpenResult } = renderHook(() => useIsMenuOpen());
			const { result: actionsResult } = renderHook(() =>
				useMobileMenuActions()
			);

			// Toggle 1: closed -> open
			act(() => {
				actionsResult.current.toggleMenu();
			});
			expect(isOpenResult.current).toBe(true);

			// Toggle 2: open -> closed
			act(() => {
				actionsResult.current.toggleMenu();
			});
			expect(isOpenResult.current).toBe(false);

			// Toggle 3: closed -> open
			act(() => {
				actionsResult.current.toggleMenu();
			});
			expect(isOpenResult.current).toBe(true);

			// Toggle 4: open -> closed
			act(() => {
				actionsResult.current.toggleMenu();
			});
			expect(isOpenResult.current).toBe(false);
		});
	});

	describe("Store reactivity", () => {
		it("should update all hooks when menu state changes", () => {
			const { result: hook1 } = renderHook(() => useIsMenuOpen());
			const { result: hook2 } = renderHook(() => useIsMenuOpen());
			const { result: actionsResult } = renderHook(() =>
				useMobileMenuActions()
			);

			// Initially both should be false
			expect(hook1.current).toBe(false);
			expect(hook2.current).toBe(false);

			// Open menu
			act(() => {
				actionsResult.current.openMenu();
			});

			// Both hooks should see the change
			expect(hook1.current).toBe(true);
			expect(hook2.current).toBe(true);
		});
	});

	describe("Idempotent actions", () => {
		it("should remain open when openMenu is called multiple times", () => {
			const { result: isOpenResult } = renderHook(() => useIsMenuOpen());
			const { result: actionsResult } = renderHook(() =>
				useMobileMenuActions()
			);

			act(() => {
				actionsResult.current.openMenu();
				actionsResult.current.openMenu();
				actionsResult.current.openMenu();
			});

			expect(isOpenResult.current).toBe(true);
		});

		it("should remain closed when closeMenu is called multiple times", () => {
			const { result: isOpenResult } = renderHook(() => useIsMenuOpen());
			const { result: actionsResult } = renderHook(() =>
				useMobileMenuActions()
			);

			act(() => {
				actionsResult.current.closeMenu();
				actionsResult.current.closeMenu();
				actionsResult.current.closeMenu();
			});

			expect(isOpenResult.current).toBe(false);
		});
	});

	describe("Action combinations", () => {
		it("should handle mixed action sequence correctly", () => {
			const { result: isOpenResult } = renderHook(() => useIsMenuOpen());
			const { result: actionsResult } = renderHook(() =>
				useMobileMenuActions()
			);

			// Start: closed
			expect(isOpenResult.current).toBe(false);

			// Open
			act(() => {
				actionsResult.current.openMenu();
			});
			expect(isOpenResult.current).toBe(true);

			// Toggle (should close)
			act(() => {
				actionsResult.current.toggleMenu();
			});
			expect(isOpenResult.current).toBe(false);

			// Open again
			act(() => {
				actionsResult.current.openMenu();
			});
			expect(isOpenResult.current).toBe(true);

			// Close
			act(() => {
				actionsResult.current.closeMenu();
			});
			expect(isOpenResult.current).toBe(false);
		});
	});
});
