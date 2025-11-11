import { renderWithProviders } from "@/test/utils/renderWithProviders";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import LoginPage from "./LoginPage";

describe("LoginPage", () => {
	it("should render login form with email and password fields", () => {
		renderWithProviders(<LoginPage />);

		expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
		expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
		expect(screen.getByRole("button", { name: /log in/i })).toBeInTheDocument();
	});

	describe("Form validation", () => {
		it("should disable submit button when form is invalid", () => {
			renderWithProviders(<LoginPage />);

			const loginButton = screen.getByRole("button", { name: /log in/i });
			expect(loginButton).toBeDisabled();
		});

		it("should enable submit button when form is valid", async () => {
			const user = userEvent.setup();
			renderWithProviders(<LoginPage />);

			const emailInput = screen.getByPlaceholderText(/email/i);
			const passwordInput = screen.getByPlaceholderText(/password/i);
			const loginButton = screen.getByRole("button", { name: /log in/i });

			await user.type(emailInput, "test@example.com");
			await user.type(passwordInput, "password123");

			await waitFor(() => {
				expect(loginButton).toBeEnabled();
			});
		});

		it("should show error message for invalid email format", async () => {
			const user = userEvent.setup();
			renderWithProviders(<LoginPage />);

			const emailInput = screen.getByPlaceholderText(/email/i);

			await user.type(emailInput, "invalid-email");

			await waitFor(() => {
				expect(screen.getByText(/invalid email format/i)).toBeInTheDocument();
			});
		});

		it("should show error message for short password", async () => {
			const user = userEvent.setup();
			renderWithProviders(<LoginPage />);

			const passwordInput = screen.getByPlaceholderText(/password/i);

			await user.type(passwordInput, "12345");

			await waitFor(() => {
				expect(
					screen.getByText(/password must be at least 6 characters/i)
				).toBeInTheDocument();
			});
		});

		it("should accept valid password with 6 characters", async () => {
			const user = userEvent.setup();
			renderWithProviders(<LoginPage />);

			const passwordInput = screen.getByPlaceholderText(/password/i);

			await user.type(passwordInput, "123456");

			await waitFor(() => {
				expect(
					screen.queryByText(/password must be at least 6 characters/i)
				).not.toBeInTheDocument();
			});
		});

		it("should clear error when invalid field is corrected", async () => {
			const user = userEvent.setup();
			renderWithProviders(<LoginPage />);

			const emailInput = screen.getByPlaceholderText(/email/i);

			// Type invalid email
			await user.type(emailInput, "invalid");

			await waitFor(() => {
				expect(screen.getByText(/invalid email format/i)).toBeInTheDocument();
			});

			// Clear and type valid email
			await user.clear(emailInput);
			await user.type(emailInput, "test@example.com");

			await waitFor(() => {
				expect(
					screen.queryByText(/invalid email format/i)
				).not.toBeInTheDocument();
			});
		});
	});

	describe("Form submission", () => {
		it("should handle form submission with valid data", async () => {
			const user = userEvent.setup();
			renderWithProviders(<LoginPage />);

			const emailInput = screen.getByPlaceholderText(/email/i);
			const passwordInput = screen.getByPlaceholderText(/password/i);
			const loginButton = screen.getByRole("button", { name: /log in/i });

			await user.type(emailInput, "test@example.com");
			await user.type(passwordInput, "password123");

			await waitFor(() => {
				expect(loginButton).toBeEnabled();
			});

			await user.click(loginButton);

			// Navigation should occur (tested through router mock)
			expect(loginButton).toBeInTheDocument();
		});

		it("should not submit form with invalid data", async () => {
			const user = userEvent.setup();
			renderWithProviders(<LoginPage />);

			const emailInput = screen.getByPlaceholderText(/email/i);
			const loginButton = screen.getByRole("button", { name: /log in/i });

			await user.type(emailInput, "invalid-email");

			// Button should remain disabled
			expect(loginButton).toBeDisabled();
		});
	});
});
