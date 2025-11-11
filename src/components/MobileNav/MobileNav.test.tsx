import { useIsMenuOpen, useMobileMenuActions } from "@/store/mobileMenu";
import { act, render, renderHook, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import MobileNav from ".";

describe("MobileNav", () => {
	it("should render with portal to document.body", () => {
		const { baseElement } = render(<MobileNav />);

		// Check that mobile nav is rendered in document.body (not in the container)
		const mobileNav = baseElement.querySelector(".mobile-nav");
		expect(mobileNav).toBeInTheDocument();

		// Verify it's a direct child of body (via portal)
		expect(document.body).toContainElement(mobileNav as HTMLElement);
	});

	it("should call closeMenu action when close button is clicked", async () => {
		const user = userEvent.setup();

		// Open the menu first
		const { result: actionsResult } = renderHook(() => useMobileMenuActions());
		act(() => {
			actionsResult.current.openMenu();
		});

		// Render MobileNav
		render(<MobileNav />);

		// Find close button
		const closeButton = screen.getByAltText("Close menu icon");
		expect(closeButton).toBeInTheDocument();

		// Click close button
		await user.click(closeButton);

		// Check menu is now closed
		const { result: menuStateResult } = renderHook(() => useIsMenuOpen());
		expect(menuStateResult.current).toBe(false);
	});

	it("should be responsive to Zustand store state changes", () => {
		// Render MobileNav initially closed
		const { result: actionsResult } = renderHook(() => useMobileMenuActions());
		act(() => {
			actionsResult.current.closeMenu();
		});

		const { rerender } = render(<MobileNav />);

		// Initially closed
		let mobileNav = document.querySelector(".mobile-nav");
		expect(mobileNav).toHaveClass("mobile-nav__closed");

		// Open menu via store
		act(() => {
			actionsResult.current.openMenu();
		});
		rerender(<MobileNav />);

		// Should now be open
		mobileNav = document.querySelector(".mobile-nav");
		expect(mobileNav).toHaveClass("mobile-nav__open");

		// Close menu via store
		act(() => {
			actionsResult.current.closeMenu();
		});
		rerender(<MobileNav />);

		// Should be closed again
		mobileNav = document.querySelector(".mobile-nav");
		expect(mobileNav).toHaveClass("mobile-nav__closed");
	});
});
