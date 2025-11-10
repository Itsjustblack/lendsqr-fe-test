import type { PaginationState, SortingState } from "@tanstack/react-table";
import { create } from "zustand";
import type { FilterFormValues } from "../libs/validation/filterSchema";

// Initial state values
const initialFilters: FilterFormValues = {};

const initialPagination: PaginationState = {
	pageIndex: 0,
	pageSize: 10,
};

const initialSorting: SortingState = [];

// Store state interface
interface UserFiltersState {
	// Data
	filters: FilterFormValues;
	pagination: PaginationState;
	sorting: SortingState;

	// Actions
	actions: {
		// Filter actions
		setFilters: (filters: FilterFormValues) => void;
		updateFilter: (key: keyof FilterFormValues, value: string | null) => void;
		resetFilters: () => void;

		// Pagination actions
		setPagination: (pagination: PaginationState) => void;
		setPageIndex: (pageIndex: number) => void;
		setPageSize: (pageSize: number) => void;

		// Sorting actions
		setSorting: (sorting: SortingState) => void;

		// Global reset
		resetStore: () => void;
	};
}

// Create the store
export const useUserFiltersStore = create<UserFiltersState>((set) => ({
	// Initial data state
	filters: initialFilters,
	pagination: initialPagination,
	sorting: initialSorting,

	// Actions
	actions: {
		// Filter actions
		setFilters: (filters) =>
			set({
				filters,
				pagination: initialPagination, // Reset to page 1 when filters change
			}),

		updateFilter: (key, value) =>
			set((state) => ({
				filters: {
					...state.filters,
					[key]: value,
				},
				pagination: initialPagination, // Reset to page 1 when any filter changes
			})),

		resetFilters: () =>
			set({
				filters: initialFilters,
				pagination: initialPagination,
			}),

		// Pagination actions
		setPagination: (pagination) => set({ pagination }),

		setPageIndex: (pageIndex) =>
			set((state) => ({
				pagination: {
					...state.pagination,
					pageIndex,
				},
			})),

		setPageSize: (pageSize) =>
			set((state) => ({
				pagination: {
					...state.pagination,
					pageSize,
					pageIndex: 0, // Reset to first page when changing page size
				},
			})),

		// Sorting actions
		setSorting: (sorting) => set({ sorting }),

		// Global reset
		resetStore: () =>
			set({
				filters: initialFilters,
				pagination: initialPagination,
				sorting: initialSorting,
			}),
	},
}));

// ============================================
// Custom Hooks for Granular Access
// ============================================

/**
 * Hook to access filter state and filter-specific actions
 */
export const useFilters = () => {
	const filters = useUserFiltersStore((state) => state.filters);
	const setFilters = useUserFiltersStore((state) => state.actions.setFilters);
	const updateFilter = useUserFiltersStore(
		(state) => state.actions.updateFilter
	);
	const resetFilters = useUserFiltersStore(
		(state) => state.actions.resetFilters
	);

	return {
		filters,
		setFilters,
		updateFilter,
		resetFilters,
	};
};

/**
 * Hook to access pagination state and pagination-specific actions
 */
export const usePagination = () => {
	const pagination = useUserFiltersStore((state) => state.pagination);
	const setPagination = useUserFiltersStore(
		(state) => state.actions.setPagination
	);
	const setPageIndex = useUserFiltersStore(
		(state) => state.actions.setPageIndex
	);
	const setPageSize = useUserFiltersStore((state) => state.actions.setPageSize);

	return {
		pagination,
		setPagination,
		setPageIndex,
		setPageSize,
	};
};

/**
 * Hook to access sorting state and sorting-specific actions
 */
export const useSorting = () => {
	const sorting = useUserFiltersStore((state) => state.sorting);
	const setSorting = useUserFiltersStore((state) => state.actions.setSorting);

	return {
		sorting,
		setSorting,
	};
};

/**
 * Hook to access all actions at once
 */
export const useTableActions = () => {
	return useUserFiltersStore((state) => state.actions);
};
