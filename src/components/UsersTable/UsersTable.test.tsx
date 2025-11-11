import {
	emptyResponseHandler,
	serverErrorHandler,
} from "@/test/mocks/handlers";
import { server } from "@/test/mocks/server";
import { renderWithProviders } from "@/test/utils/renderWithProviders";
import { screen, waitFor, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import UsersTable from ".";

describe("UsersTable", () => {
	it("should render table with correct columns", async () => {
		renderWithProviders(<UsersTable />);

		// Wait for table to render
		const table = await screen.findByRole("table");
		expect(table).toBeInTheDocument();

		// Verify all 7 column headers exist in correct order
		const headers = within(table).getAllByRole("columnheader");
		expect(headers).toHaveLength(7);
		expect(headers[0]).toHaveTextContent("Organization");
		expect(headers[1]).toHaveTextContent("Username");
		expect(headers[2]).toHaveTextContent("Email");
		expect(headers[3]).toHaveTextContent("Phone Number");
		expect(headers[4]).toHaveTextContent("Date Joined");
		expect(headers[5]).toHaveTextContent("Status");
		expect(headers[6]).toHaveTextContent(""); // Actions column has filter icon, no text
	});

	it("should fetch data with React Query", async () => {
		renderWithProviders(<UsersTable />);

		// Wait for table to load
		const table = await screen.findByRole("table");

		// Verify actual user data from API appears in table
		await waitFor(() => {
			const cells = within(table).getAllByRole("cell");
			expect(cells.length).toBeGreaterThan(0);
		});

		// Verify table has data rows
		const rows = within(table).getAllByRole("row");
		expect(rows.length).toBeGreaterThan(1);
	});

	it("should show loading skeleton", async () => {
		renderWithProviders(<UsersTable />);

		// Verify loader appears during data fetch
		const loader = screen.getByTestId("loader");
		// Loader may appear briefly, but component renders headers immediately

		// Wait for data to finish loading
		await waitFor(() => {
			expect(screen.getByText(/Showing/i)).toBeInTheDocument();
		});

		// Loader should be gone after data loads
		expect(loader).not.toBeInTheDocument();
	});

	it("should show error state with illustration on API failure", async () => {
		// Override MSW handler to return error
		server.use(serverErrorHandler);

		renderWithProviders(<UsersTable />);

		// Verify error UI displays
		await waitFor(() => {
			expect(screen.getByText("Unable to load users")).toBeInTheDocument();
		});
		expect(screen.getByText("Please try again later.")).toBeInTheDocument();

		// Verify error illustration appears
		const errorImage = screen.getByAltText("Error illustration");
		expect(errorImage).toBeInTheDocument();
	});

	it("should render user rows with data", async () => {
		renderWithProviders(<UsersTable />);

		// Wait for data to load
		const table = await screen.findByRole("table");

		// Wait for data rows to appear
		await waitFor(() => {
			const rows = within(table).getAllByRole("row");
			// Should have header row + 10 data rows (default page size)
			expect(rows.length).toBe(11);
		});

		// Verify rows contain actual user data (cells)
		const rows = within(table).getAllByRole("row");
		const dataRows = rows.slice(1); // Skip header row
		expect(dataRows).toHaveLength(10);

		// Verify first data row has cells with content
		const firstRowCells = within(dataRows[0]).getAllByRole("cell");
		expect(firstRowCells.length).toBeGreaterThan(0);
	});

	it("should integrate TableFilter correctly", async () => {
		renderWithProviders(<UsersTable />);

		// Wait for table to load
		await screen.findByRole("table");

		// Filter button should be present in the actions column header
		const filterButton = screen.getByAltText("Filters Icon");
		expect(filterButton).toBeInTheDocument();

		// Verify filter is in a table header cell
		const headerCell = filterButton.closest("th");
		expect(headerCell).toBeInTheDocument();

		// Verify filter button is clickable
		expect(filterButton.closest("button")).toBeInTheDocument();
	});

	it('should show "No Users Found" when empty', async () => {
		// Override MSW to return empty data
		server.use(emptyResponseHandler);

		renderWithProviders(<UsersTable />);

		// Verify empty state UI displays
		await waitFor(() => {
			expect(screen.getByText("No Users Found")).toBeInTheDocument();
		});

		// Verify empty state message
		expect(
			screen.getByText(/Customers will show up here/i)
		).toBeInTheDocument();

		// Verify empty state illustration
		const emptyImage = screen.getByAltText("No Users");
		expect(emptyImage).toBeInTheDocument();
	});
});
