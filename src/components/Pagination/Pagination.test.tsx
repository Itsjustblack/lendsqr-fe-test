import type { User } from "@/types/user";
import type { Table } from "@tanstack/react-table";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import Pagination from ".";

// Create mock table
const createMockTable = (overrides = {}) =>
	({
		getState: vi.fn(() => ({
			pagination: { pageIndex: 0, pageSize: 10 },
		})),
		getPageCount: vi.fn(() => 50),
		getCanPreviousPage: vi.fn(() => false),
		getCanNextPage: vi.fn(() => true),
		setPageIndex: vi.fn(),
		setPageSize: vi.fn(),
		previousPage: vi.fn(),
		nextPage: vi.fn(),
		...overrides,
	} as unknown as Table<User>);

describe("Pagination", () => {
	it("should render page size dropdown with options", async () => {
		const setPageSizeMock = vi.fn();
		const table = createMockTable({ setPageSize: setPageSizeMock });

		render(<Pagination table={table} />);

		// Find and verify the dropdown renders
		const dropdown = screen.getByText("10").closest(".dropdown");
		expect(dropdown).toBeInTheDocument();

		// Verify dropdown is interactive (has combobox role)
		const combobox = screen.getByRole("combobox");
		expect(combobox).toBeInTheDocument();
	});

	it("should disable Previous button on first page", () => {
		const table = createMockTable({
			getState: vi.fn(() => ({
				pagination: { pageIndex: 0, pageSize: 10 },
			})),
			getCanPreviousPage: vi.fn(() => false),
		});

		render(<Pagination table={table} />);

		const prevButton = screen.getByLabelText("Previous page");
		expect(prevButton).toBeDisabled();
	});

	it("should disable Next button on last page", () => {
		const table = createMockTable({
			getState: vi.fn(() => ({
				pagination: { pageIndex: 49, pageSize: 10 },
			})),
			getCanNextPage: vi.fn(() => false),
			getCanPreviousPage: vi.fn(() => true),
		});

		render(<Pagination table={table} />);

		const nextButton = screen.getByLabelText("Next page");
		expect(nextButton).toBeDisabled();
	});

	it("should call setPageIndex when page number is clicked", async () => {
		const user = userEvent.setup();
		const setPageIndexMock = vi.fn();
		const table = createMockTable({ setPageIndex: setPageIndexMock });

		render(<Pagination table={table} />);

		// Click on page 2 button
		const page2Button = screen.getByRole("button", { name: "Go to page 2" });
		await user.click(page2Button);

		expect(setPageIndexMock).toHaveBeenCalledWith(1); // pageIndex is 0-based
	});

	it("should display current page info correctly", () => {
		const table = createMockTable({
			getPageCount: vi.fn(() => 50),
			getState: vi.fn(() => ({
				pagination: { pageIndex: 0, pageSize: 10 },
			})),
		});

		render(<Pagination table={table} />);

		// Should show "Showing 10 out of 50"
		expect(screen.getByText("Showing")).toBeInTheDocument();
		expect(screen.getByText("out of 50")).toBeInTheDocument();
	});
});
