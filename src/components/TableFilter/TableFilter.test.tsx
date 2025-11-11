import { describe, it, expect, beforeEach } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import { renderWithProviders } from "@/test/utils/renderWithProviders";
import userEvent from "@testing-library/user-event";
import { renderHook, act } from "@testing-library/react";
import TableFilterButton from ".";
import { useFilters } from "@/store/filters";

describe("TableFilter", () => {
	beforeEach(() => {
		// Reset filters before each test
		const { result } = renderHook(() => useFilters());
		act(() => {
			result.current.resetFilters();
		});
	});

	it("should open popover when filter button is clicked", async () => {
		const user = userEvent.setup();
		renderWithProviders(<TableFilterButton />);

		const button = screen.getByRole("button");
		await user.click(button);

		// Check for username input which has proper ID
		const usernameField = await screen.findByLabelText("Username");
		expect(usernameField).toBeInTheDocument();
	});

	it("should render all filter fields", async () => {
		const user = userEvent.setup();
		renderWithProviders(<TableFilterButton />);

		const button = screen.getByRole("button");
		await user.click(button);

		// Check for inputs with proper IDs
		expect(await screen.findByLabelText("Username")).toBeInTheDocument();
		expect(screen.getByLabelText("Email")).toBeInTheDocument();
		expect(screen.getByLabelText("Date")).toBeInTheDocument();
		expect(screen.getByLabelText("Phone Number")).toBeInTheDocument();

		// Check Dropdowns
		expect(screen.getByText("Organization")).toBeInTheDocument();
		expect(screen.getByText("Status")).toBeInTheDocument();
	});

	it("should show error for invalid email format", async () => {
		const user = userEvent.setup();
		renderWithProviders(<TableFilterButton />);

		const menuButton = screen.getByRole("button");
		await user.click(menuButton);

		const emailInput = await screen.findByLabelText("Email");
		await user.type(emailInput, "invalid-email");
		await user.tab(); // Trigger validation

		await waitFor(() => {
			expect(screen.getByText("Invalid email format")).toBeInTheDocument();
		});
	});

	it("should apply filters when Filter button is clicked", async () => {
		const user = userEvent.setup();
		renderWithProviders(<TableFilterButton />);

		const menuButton = screen.getByRole("button");
		await user.click(menuButton);

		const usernameInput = await screen.findByLabelText("Username");
		await user.type(usernameInput, "john_doe");

		const filterButton = screen.getByRole("button", { name: "Filter" });
		await user.click(filterButton);

		// Check that filters were applied to store
		await waitFor(() => {
			const { result } = renderHook(() => useFilters());
			expect(result.current.filters.username).toBeDefined();
		});
	});

	it("should clear filters when Reset button is clicked", async () => {
		const user = userEvent.setup();
		renderWithProviders(<TableFilterButton />);

		const menuButton = screen.getByRole("button");
		await user.click(menuButton);

		const usernameInput = await screen.findByLabelText("Username");
		await user.type(usernameInput, "test");

		const resetButton = screen.getByRole("button", { name: /reset/i });
		await user.click(resetButton);

		// Input should be cleared
		await waitFor(() => {
			expect(usernameInput).toHaveValue("");
		});
	});

	it("should update Zustand store with filters", async () => {
		const user = userEvent.setup();

		// Reset filters first
		const { result: actionsResult } = renderHook(() => useFilters());
		act(() => {
			actionsResult.current.resetFilters();
		});

		renderWithProviders(<TableFilterButton />);

		const menuButton = screen.getByRole("button");
		await user.click(menuButton);

		const emailInput = await screen.findByLabelText("Email");
		await user.type(emailInput, "test@example.com");

		const filterButton = screen.getByRole("button", { name: "Filter" });
		await user.click(filterButton);

		// Check store was updated with email filter
		await waitFor(() => {
			const { result: newFiltersResult } = renderHook(() => useFilters());
			expect(newFiltersResult.current.filters.email).toBe("test@example.com");
		});
	});

	it("should not show error for valid email", async () => {
		const user = userEvent.setup();
		renderWithProviders(<TableFilterButton />);

		const menuButton = screen.getByRole("button");
		await user.click(menuButton);

		const emailInput = await screen.findByLabelText("Email");
		await user.type(emailInput, "test@example.com");

		// No error message should appear
		expect(
			screen.queryByText("Invalid email format")
		).not.toBeInTheDocument();
	});

	it("should show error for invalid phone number format", async () => {
		const user = userEvent.setup();
		renderWithProviders(<TableFilterButton />);

		const menuButton = screen.getByRole("button");
		await user.click(menuButton);

		const phoneInput = await screen.findByLabelText("Phone Number");
		await user.type(phoneInput, "abc123def");
		await user.tab();

		await waitFor(() => {
			expect(
				screen.getByText("Invalid phone number format")
			).toBeInTheDocument();
		});
	});

	it("should accept valid phone number formats", async () => {
		const user = userEvent.setup();
		renderWithProviders(<TableFilterButton />);

		const menuButton = screen.getByRole("button");
		await user.click(menuButton);

		const phoneInput = await screen.findByLabelText("Phone Number");
		await user.type(phoneInput, "+2349012323352");

		// No error message should appear
		expect(
			screen.queryByText("Invalid phone number format")
		).not.toBeInTheDocument();
	});

	it("should use native date picker for date input", async () => {
		const user = userEvent.setup();
		renderWithProviders(<TableFilterButton />);

		const menuButton = screen.getByRole("button");
		await user.click(menuButton);

		const dateInput = await screen.findByLabelText("Date");

		// Date input should have type="date" which provides native validation
		expect(dateInput).toHaveAttribute("type", "date");

		// Can accept valid YYYY-MM-DD format
		await user.type(dateInput, "2024-01-15");
		expect(dateInput).toHaveValue("2024-01-15");
	});

	it("should disable Filter button when form has validation errors", async () => {
		const user = userEvent.setup();
		renderWithProviders(<TableFilterButton />);

		const menuButton = screen.getByRole("button");
		await user.click(menuButton);

		const emailInput = await screen.findByLabelText("Email");
		await user.type(emailInput, "invalid-email");
		await user.tab();

		await waitFor(() => {
			expect(screen.getByText("Invalid email format")).toBeInTheDocument();
		});

		const filterButton = screen.getByRole("button", { name: "Filter" });
		expect(filterButton).toBeDisabled();
	});

	it("should handle multiple validation errors simultaneously", async () => {
		const user = userEvent.setup();
		renderWithProviders(<TableFilterButton />);

		const menuButton = screen.getByRole("button");
		await user.click(menuButton);

		const emailInput = await screen.findByLabelText("Email");
		const phoneInput = await screen.findByLabelText("Phone Number");

		// Enter invalid values in multiple fields
		await user.type(emailInput, "invalid-email");
		await user.type(phoneInput, "abc123");
		await user.tab();

		// Both errors should appear
		await waitFor(() => {
			expect(screen.getByText("Invalid email format")).toBeInTheDocument();
			expect(
				screen.getByText("Invalid phone number format")
			).toBeInTheDocument();
		});
	});
});
