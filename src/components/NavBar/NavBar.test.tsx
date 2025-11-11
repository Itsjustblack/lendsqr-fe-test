import { useIsMenuOpen } from "@/store/mobileMenu";
import { renderWithProviders } from "@/test/utils/renderWithProviders";
import { renderHook, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import NavBar from ".";

describe("NavBar", () => {
	it("should toggle mobile menu when menu button is clicked", async () => {
		const user = userEvent.setup();

		// Get initial menu state
		const { result: menuStateResult } = renderHook(() => useIsMenuOpen());
		const initialState = menuStateResult.current;

		// Render NavBar
		renderWithProviders(<NavBar />);

		// Find and click menu button
		const menuButton = screen.getByRole("button", { name: /menu icon/i });
		await user.click(menuButton);

		// Re-check menu state after click
		const { result: newMenuStateResult } = renderHook(() => useIsMenuOpen());
		const newState = newMenuStateResult.current;

		// State should have toggled from initial state
		expect(newState).toBe(!initialState);
	});
});
