import type { FilterFormValues } from "@/libs/validation/filterSchema";
import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { useFilters, usePagination, useTableActions } from "./filters";

describe("useUserFiltersStore", () => {
	beforeEach(() => {
		// Reset store before each test
		const { result } = renderHook(() => useTableActions());
		act(() => {
			result.current.resetStore();
		});
	});

	describe("Initial state", () => {
		it("should have empty filters initially", () => {
			const { result } = renderHook(() => useFilters());
			expect(result.current.filters).toEqual({});
		});

		it("should have default pagination values", () => {
			const { result } = renderHook(() => usePagination());
			expect(result.current.pagination).toEqual({
				pageIndex: 0,
				pageSize: 10,
			});
		});
	});

	describe("Filter actions", () => {
		it("should set filters and reset pagination", () => {
			const { result: filtersResult } = renderHook(() => useFilters());
			const { result: paginationResult } = renderHook(() => usePagination());

			// Set initial pagination to page 5
			act(() => {
				paginationResult.current.setPageIndex(5);
			});

			expect(paginationResult.current.pagination.pageIndex).toBe(5);

			// Set filters
			const newFilters: FilterFormValues = {
				username: "john_doe",
				status: "active",
			};

			act(() => {
				filtersResult.current.setFilters(newFilters);
			});

			expect(filtersResult.current.filters).toEqual(newFilters);
			// Pagination should be reset to page 0
			expect(paginationResult.current.pagination.pageIndex).toBe(0);
		});

		it("should update a single filter and reset pagination", () => {
			const { result: filtersResult } = renderHook(() => useFilters());
			const { result: paginationResult } = renderHook(() => usePagination());

			// Set initial pagination
			act(() => {
				paginationResult.current.setPageIndex(3);
			});

			// Update a single filter
			act(() => {
				filtersResult.current.updateFilter("email", "test@example.com");
			});

			expect(filtersResult.current.filters).toEqual({
				email: "test@example.com",
			});
			expect(paginationResult.current.pagination.pageIndex).toBe(0);
		});

		it("should update multiple filters sequentially", () => {
			const { result } = renderHook(() => useFilters());

			act(() => {
				result.current.updateFilter("username", "jane");
			});

			act(() => {
				result.current.updateFilter("organization", "Lendsqr");
			});

			act(() => {
				result.current.updateFilter("status", "pending");
			});

			expect(result.current.filters).toEqual({
				username: "jane",
				organization: "Lendsqr",
				status: "pending",
			});
		});

		it("should handle null filter values", () => {
			const { result } = renderHook(() => useFilters());

			act(() => {
				result.current.updateFilter("username", "test");
			});

			act(() => {
				result.current.updateFilter("username", null);
			});

			expect(result.current.filters).toEqual({
				username: null,
			});
		});

		it("should reset filters and pagination", () => {
			const { result: filtersResult } = renderHook(() => useFilters());
			const { result: paginationResult } = renderHook(() => usePagination());

			// Set filters and pagination
			act(() => {
				filtersResult.current.setFilters({
					username: "test",
					email: "test@test.com",
				});
				paginationResult.current.setPageIndex(5);
				paginationResult.current.setPageSize(50);
			});

			// Reset
			act(() => {
				filtersResult.current.resetFilters();
			});

			expect(filtersResult.current.filters).toEqual({});
			expect(paginationResult.current.pagination).toEqual({
				pageIndex: 0,
				pageSize: 10,
			});
		});
	});

	describe("Pagination actions", () => {
		it("should set pagination state", () => {
			const { result } = renderHook(() => usePagination());

			act(() => {
				result.current.setPagination({
					pageIndex: 5,
					pageSize: 50,
				});
			});

			expect(result.current.pagination).toEqual({
				pageIndex: 5,
				pageSize: 50,
			});
		});

		it("should update page index", () => {
			const { result } = renderHook(() => usePagination());

			act(() => {
				result.current.setPageIndex(10);
			});

			expect(result.current.pagination.pageIndex).toBe(10);
			expect(result.current.pagination.pageSize).toBe(10); // Should remain unchanged
		});

		it("should update page size and reset page index to 0", () => {
			const { result } = renderHook(() => usePagination());

			// Set initial page index
			act(() => {
				result.current.setPageIndex(5);
			});

			// Change page size
			act(() => {
				result.current.setPageSize(50);
			});

			expect(result.current.pagination).toEqual({
				pageIndex: 0, // Should be reset
				pageSize: 50,
			});
		});

		it("should handle multiple page index updates", () => {
			const { result } = renderHook(() => usePagination());

			act(() => {
				result.current.setPageIndex(1);
			});
			expect(result.current.pagination.pageIndex).toBe(1);

			act(() => {
				result.current.setPageIndex(2);
			});
			expect(result.current.pagination.pageIndex).toBe(2);

			act(() => {
				result.current.setPageIndex(3);
			});
			expect(result.current.pagination.pageIndex).toBe(3);
		});
	});

	describe("useTableActions", () => {
		it("should provide all actions", () => {
			const { result } = renderHook(() => useTableActions());

			expect(result.current).toHaveProperty("setFilters");
			expect(result.current).toHaveProperty("updateFilter");
			expect(result.current).toHaveProperty("resetFilters");
			expect(result.current).toHaveProperty("setPagination");
			expect(result.current).toHaveProperty("setPageIndex");
			expect(result.current).toHaveProperty("setPageSize");
			expect(result.current).toHaveProperty("resetStore");
		});

		it("should reset entire store", () => {
			const { result: actionsResult } = renderHook(() => useTableActions());
			const { result: filtersResult } = renderHook(() => useFilters());
			const { result: paginationResult } = renderHook(() => usePagination());

			// Set some state - set pageSize first (which resets pageIndex)
			act(() => {
				actionsResult.current.setFilters({
					username: "test",
					status: "active",
				});
				actionsResult.current.setPageSize(100);
			});

			// Then set pageIndex after pageSize
			act(() => {
				actionsResult.current.setPageIndex(10);
			});

			// Verify state was set
			expect(filtersResult.current.filters).not.toEqual({});
			expect(paginationResult.current.pagination.pageIndex).toBe(10);
			expect(paginationResult.current.pagination.pageSize).toBe(100);

			// Reset store
			act(() => {
				actionsResult.current.resetStore();
			});

			expect(filtersResult.current.filters).toEqual({});
			expect(paginationResult.current.pagination).toEqual({
				pageIndex: 0,
				pageSize: 10,
			});
		});
	});

	describe("Store reactivity", () => {
		it("should update all hooks when filters change", () => {
			const { result: hook1 } = renderHook(() => useFilters());
			const { result: hook2 } = renderHook(() => useFilters());

			act(() => {
				hook1.current.setFilters({ username: "shared" });
			});

			// Both hooks should see the same state
			expect(hook1.current.filters).toEqual({ username: "shared" });
			expect(hook2.current.filters).toEqual({ username: "shared" });
		});

		it("should update all hooks when pagination changes", () => {
			const { result: hook1 } = renderHook(() => usePagination());
			const { result: hook2 } = renderHook(() => usePagination());

			act(() => {
				hook1.current.setPageIndex(7);
			});

			// Both hooks should see the same state
			expect(hook1.current.pagination.pageIndex).toBe(7);
			expect(hook2.current.pagination.pageIndex).toBe(7);
		});
	});

	describe("Edge cases", () => {
		it("should handle setting empty filters", () => {
			const { result } = renderHook(() => useFilters());

			act(() => {
				result.current.setFilters({});
			});

			expect(result.current.filters).toEqual({});
		});

		it("should handle page index of 0", () => {
			const { result } = renderHook(() => usePagination());

			act(() => {
				result.current.setPageIndex(0);
			});

			expect(result.current.pagination.pageIndex).toBe(0);
		});

		it("should handle large page numbers", () => {
			const { result } = renderHook(() => usePagination());

			act(() => {
				result.current.setPageIndex(999);
			});

			expect(result.current.pagination.pageIndex).toBe(999);
		});

		it("should handle various page sizes", () => {
			const { result } = renderHook(() => usePagination());
			const pageSizes = [10, 20, 50, 100];

			pageSizes.forEach((size) => {
				act(() => {
					result.current.setPageSize(size);
				});
				expect(result.current.pagination.pageSize).toBe(size);
				expect(result.current.pagination.pageIndex).toBe(0); // Always resets
			});
		});
	});
});
