import type { PaginationState } from "@tanstack/react-table";
import { create } from "zustand";
import type { FilterFormValues } from "../libs/validation/filterSchema";

// Initial state values
const initialFilters: FilterFormValues = {};

const initialPagination: PaginationState = {
	pageIndex: 0,
	pageSize: 10,
};

// Store state interface
interface UserFiltersState {
	filters: FilterFormValues;
	pagination: PaginationState;
	actions: {
		setFilters: (filters: FilterFormValues) => void;
		updateFilter: (key: keyof FilterFormValues, value: string | null) => void;
		resetFilters: () => void;
		setPagination: (pagination: PaginationState) => void;
		setPageIndex: (pageIndex: number) => void;
		setPageSize: (pageSize: number) => void;
		resetStore: () => void;
	};
}

// Create the store
export const useUserFiltersStore = create<UserFiltersState>((set) => ({
	// Initial data state
	filters: initialFilters,
	pagination: initialPagination,

	// Actions
	actions: {
		// Filter actions
		setFilters: (filters) =>
			set({
				filters,
				pagination: initialPagination,
			}),

		updateFilter: (key, value) =>
			set((state) => ({
				filters: {
					...state.filters,
					[key]: value,
				},
				pagination: initialPagination,
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
					pageIndex: 0,
				},
			})),

		// Global reset
		resetStore: () =>
			set({
				filters: initialFilters,
				pagination: initialPagination,
			}),
	},
}));

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

export const useTableActions = () => {
	return useUserFiltersStore((state) => state.actions);
};
