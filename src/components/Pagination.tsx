import type { Table } from "@tanstack/react-table";
import "../styles/components/Pagination.scss";
import type { User } from "../types/user";
import Dropdown from "./Dropdown";
import { PAGE_SIZES } from "../libs/constants";

interface PaginationProps<TData> {
	table: Table<TData>;
}

type OptionType = {
	label: string;
	value: number;
};

// Pagination display constants
const MAX_VISIBLE_PAGES = 7;
const PAGE_THRESHOLD = 3;
const ELLIPSIS = "...";

const Pagination = ({ table }: PaginationProps<User>) => {
	// Map page sizes to dropdown options
	const options: OptionType[] = PAGE_SIZES.map((num) => ({
		label: num.toString(),
		value: num,
	}));

	// Extract table state
	const {
		pagination: { pageIndex, pageSize },
	} = table.getState();
	const pageCount = table.getPageCount();
	const currentPage = pageIndex + 1;
	const canPreviousPage = table.getCanPreviousPage();
	const canNextPage = table.getCanNextPage();

	// Find the selected page size option
	const selectedOption =
		options.find((opt) => opt.value === pageSize) || options[0];

	// Event handlers
	const handlePageChange = (page: number) => {
		table.setPageIndex(page - 1);
	};

	const handlePageSize = (option: OptionType | null) => {
		if (option) table.setPageSize(option.value);
	};

	/**
	 * Generates an array of page numbers to display in the pagination controls.
	 * Shows all pages if total is ≤7, otherwise shows abbreviated list with ellipsis.
	 */
	const generatePageNumbers = (): (number | string)[] => {
		// Edge case: no pages to display
		if (pageCount === 0) return [];

		// Show all pages if count is within threshold
		if (pageCount <= MAX_VISIBLE_PAGES) {
			return Array.from({ length: pageCount }, (_, i) => i + 1);
		}

		// Near the beginning (pages 1-3)
		if (currentPage <= PAGE_THRESHOLD) {
			return [1, 2, 3, 4, ELLIPSIS, pageCount];
		}

		// Near the end (last 3 pages)
		if (currentPage >= pageCount - PAGE_THRESHOLD + 1) {
			return [
				1,
				ELLIPSIS,
				pageCount - 3,
				pageCount - 2,
				pageCount - 1,
				pageCount,
			];
		}

		// In the middle - show current page with context
		return [
			1,
			ELLIPSIS,
			currentPage - 1,
			currentPage,
			currentPage + 1,
			ELLIPSIS,
			pageCount,
		];
	};

	const pageNumbers = generatePageNumbers();

	return (
		<div className="pagination">
			<div className="pagination-left">
				<span className="pagination-text">Showing</span>
				<Dropdown
					options={options}
					selectedOption={selectedOption}
					onChange={handlePageSize}
					variant="pagination"
				/>
				<span className="pagination-text">out of {pageCount}</span>
			</div>

			<div className="pagination-right">
				{/* Previous page button */}
				<button
					className="pagination-nav"
					onClick={() => table.previousPage()}
					disabled={!canPreviousPage}
					aria-label="Previous page"
				>
					<img
						src="/assets/icons/arrow-right.svg"
						alt=""
						className="arrow-left"
					/>
				</button>

				{/* Page number buttons */}
				<div className="pagination-pages">
					{pageNumbers.map((page, index) => {
						if (page === ELLIPSIS) {
							return (
								<span
									key={`ellipsis-${index < pageNumbers.length / 2 ? "start" : "end"}`}
									className="pagination-ellipsis"
								>
									{ELLIPSIS}
								</span>
							);
						}

						return (
							<button
								key={page}
								className={`pagination-page ${
									page === currentPage ? "active" : ""
								}`}
								onClick={() => handlePageChange(page as number)}
								aria-label={`Go to page ${page}`}
								aria-current={page === currentPage ? "page" : undefined}
							>
								{page}
							</button>
						);
					})}
				</div>

				{/* Next page button */}
				<button
					className="pagination-nav"
					onClick={() => table.nextPage()}
					disabled={!canNextPage}
					aria-label="Next page"
				>
					<img
						src="/assets/icons/arrow-right.svg"
						alt=""
						className="arrow-right"
					/>
				</button>
			</div>
		</div>
	);
};

export default Pagination;
