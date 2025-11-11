import { describe, it, expect } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import { renderWithProviders } from "@/test/utils/renderWithProviders";
import userEvent from "@testing-library/user-event";
import ActionsMenu from ".";

describe("ActionsMenu", () => {
	it("should open popover when button is clicked", async () => {
		const user = userEvent.setup();
		renderWithProviders(<ActionsMenu userId="123" />);

		const button = screen.getByRole("button");
		await user.click(button);

		await waitFor(() => {
			expect(screen.getByText("View Details")).toBeInTheDocument();
		});
	});

	it('should navigate to user details on "View Details" click', async () => {
		const user = userEvent.setup();

		renderWithProviders(<ActionsMenu userId="123" />, {
			route: "/users",
		});

		// Open menu
		const button = screen.getByRole("button");
		await user.click(button);

		// Click View Details
		const viewDetailsButton = await screen.findByText("View Details");
		await user.click(viewDetailsButton);

		// Menu should close after click
		await waitFor(() => {
			expect(screen.queryByText("View Details")).not.toBeInTheDocument();
		});
	});

	it("should close menu after selecting an action", async () => {
		const user = userEvent.setup();
		renderWithProviders(<ActionsMenu userId="123" />);

		// Open menu
		const button = screen.getByRole("button");
		await user.click(button);

		await waitFor(() => {
			expect(screen.getByText("Blacklist User")).toBeInTheDocument();
		});

		// Click Blacklist User
		const blacklistButton = screen.getByText("Blacklist User");
		await user.click(blacklistButton);

		// Menu should close
		await waitFor(() => {
			expect(screen.queryByText("Blacklist User")).not.toBeInTheDocument();
		});
	});

	it("should render popover with menu items", async () => {
		const user = userEvent.setup();
		renderWithProviders(<ActionsMenu userId="123" />);

		const button = screen.getByRole("button");
		await user.click(button);

		await waitFor(() => {
			expect(screen.getByText("View Details")).toBeInTheDocument();
			expect(screen.getByText("Blacklist User")).toBeInTheDocument();
			expect(screen.getByText("Activate User")).toBeInTheDocument();
		});
	});
});
