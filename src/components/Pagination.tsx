import type { Table } from "@tanstack/react-table";
import "../styles/components/Pagination.scss";
import type { User } from "../types/user";
import Dropdown, { type OptionType } from "./Dropdown";
import { ELLIPSIS, PAGE_SIZES } from "../libs/constants";
import { generatePageNumbers } from "../libs/utils";

interface PaginationProps<TData> {
	table: Table<TData>;
}

const Pagination = ({ table }: PaginationProps<User>) => {
	const options: OptionType[] = PAGE_SIZES.map((num) => ({
		label: num.toString(),
		value: num,
	}));

	const {
		pagination: { pageIndex, pageSize },
	} = table.getState();

	const pageCount = table.getPageCount();
	const currentPage = pageIndex + 1;
	const canPreviousPage = table.getCanPreviousPage();
	const canNextPage = table.getCanNextPage();

	const selectedOption =
		options.find((opt) => opt.value === pageSize) || options[0];

	const handlePageChange = (page: number) => {
		table.setPageIndex(page - 1);
	};

	const handlePageSize = (option: OptionType | null) => {
		if (option) table.setPageSize(option.value);
	};

	const pageNumbers = generatePageNumbers(pageCount, currentPage);

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
									key={`ellipsis-${
										index < pageNumbers.length / 2 ? "start" : "end"
									}`}
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
