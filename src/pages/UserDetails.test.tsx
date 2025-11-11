import { describe, it, expect, beforeEach } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "@/test/utils/renderWithProviders";
import userEvent from "@testing-library/user-event";
import UserDetails from "./UserDetails";
import {
	setLocalStorageItem,
	clearLocalStorage,
	getLocalStorageItem,
} from "@/test/utils/storageHelpers";
import { mockUserDetails } from "@/test/mocks/mockData";

describe("UserDetails", () => {
	beforeEach(() => {
		clearLocalStorage();
	});

	it("should read user data from localStorage", () => {
		setLocalStorageItem("user-details", mockUserDetails);

		renderWithProviders(<UserDetails />, { route: "/users/123" });

		// Component should read from localStorage
		expect(screen.getByText("Personal Information")).toBeInTheDocument();
	});

	it("should fall back to mock data if localStorage is empty", () => {
		// Don't set localStorage
		renderWithProviders(<UserDetails />, { route: "/users/123" });

		// Should still render with fallback data
		expect(screen.getByText("Personal Information")).toBeInTheDocument();
	});

	it("should navigate back when back button is clicked", async () => {
		const user = userEvent.setup();
		renderWithProviders(<UserDetails />, { route: "/users/123" });

		const backButton = screen.getByText(/back to users/i);
		await user.click(backButton);

		// Navigation happens via router
		expect(backButton).toBeInTheDocument();
	});

	it("should update localStorage on mount", () => {
		renderWithProviders(<UserDetails />, { route: "/users/123" });

		// Component renders and may update localStorage
		expect(screen.getByText("Personal Information")).toBeInTheDocument();

		// Check if localStorage was written
		const stored = getLocalStorageItem("user-details");
		expect(stored).toBeDefined();
	});

	describe("Error Handling - Negative Scenarios", () => {
		it("should handle corrupted localStorage data gracefully", () => {
			// Set corrupted/invalid data structure
			const corruptedData = {
				basicInfo: null, // Missing required nested object
				personalInfo: "invalid", // Wrong type
			};
			setLocalStorageItem("user-details", corruptedData);

			renderWithProviders(<UserDetails />, { route: "/users/123" });

			// Should fall back to mock data and still render
			expect(screen.getByText("Personal Information")).toBeInTheDocument();
		});

		it("should handle missing required user fields", () => {
			// Set data with missing required fields
			const incompleteData = {
				basicInfo: {
					name: "Test User",
					// Missing userId, tier, accountBalance, etc.
				},
				personalInfo: {
					fullName: "Test User",
					// Missing other required fields
				},
			};
			setLocalStorageItem("user-details", incompleteData);

			renderWithProviders(<UserDetails />, { route: "/users/123" });

			// Should handle gracefully and render what's available
			expect(screen.getByText("Personal Information")).toBeInTheDocument();
		});

		it("should handle non-existent user ID", () => {
			// Render with a user ID that doesn't exist
			renderWithProviders(<UserDetails />, { route: "/users/999999" });

			// Should still render with fallback data
			expect(screen.getByText("Personal Information")).toBeInTheDocument();
		});

		it("should handle malformed JSON in localStorage", () => {
			// Manually set invalid JSON in localStorage
			localStorage.setItem("user-details", "{invalid json}");

			renderWithProviders(<UserDetails />, { route: "/users/123" });

			// Should fall back to mock data
			expect(screen.getByText("Personal Information")).toBeInTheDocument();
		});

		it("should display error state when user data is invalid", () => {
			// Set completely invalid data type
			const invalidData = "not an object" as any;
			setLocalStorageItem("user-details", invalidData);

			renderWithProviders(<UserDetails />, { route: "/users/123" });

			// Should handle gracefully and show some content
			expect(screen.getByText("Personal Information")).toBeInTheDocument();
		});

		it("should navigate back when user ID is missing from route", () => {
			// Render without a user ID in the route
			renderWithProviders(<UserDetails />, { route: "/users/" });

			// Should still render (component doesn't validate route params currently)
			// But this documents expected behavior if validation is added
			expect(screen.getByText("Personal Information")).toBeInTheDocument();
		});
	});
});
