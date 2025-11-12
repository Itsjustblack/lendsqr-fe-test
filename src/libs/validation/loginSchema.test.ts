import { describe, expect, it } from "vitest";
import { loginSchema } from "./loginSchema";

describe("loginSchema", () => {
	describe("Valid inputs", () => {
		it("should accept valid email and password", () => {
			const validData = {
				email: "user@example.com",
				password: "password123",
			};

			const result = loginSchema.safeParse(validData);
			expect(result.success).toBe(true);
			if (result.success) {
				expect(result.data).toEqual(validData);
			}
		});

		it("should accept password with minimum length of 6", () => {
			const data = {
				email: "test@example.com",
				password: "123456",
			};

			const result = loginSchema.safeParse(data);
			expect(result.success).toBe(true);
		});
	});

	describe("Email validation", () => {
		it("should reject invalid email format", () => {
			const data = {
				email: "not-an-email",
				password: "password123",
			};

			const result = loginSchema.safeParse(data);
			expect(result.success).toBe(false);
			if (!result.success) {
				expect(result.error.issues[0].message).toBe("Invalid email format");
			}
		});

		it("should reject missing email", () => {
			const data = {
				password: "password123",
			};

			const result = loginSchema.safeParse(data);
			expect(result.success).toBe(false);
		});

		it("should accept various valid email formats", () => {
			const validEmails = [
				"test@example.com",
				"user.name@example.co.uk",
				"user+tag@example.com",
				"first.last@subdomain.example.com",
			];

			validEmails.forEach((email) => {
				const result = loginSchema.safeParse({
					email,
					password: "password123",
				});
				expect(result.success).toBe(true);
			});
		});
	});

	describe("Password validation", () => {
		it("should reject empty password", () => {
			const data = {
				email: "test@example.com",
				password: "",
			};

			const result = loginSchema.safeParse(data);
			expect(result.success).toBe(false);
			if (!result.success) {
				expect(result.error.issues[0].message).toBe("Password is required");
			}
		});

		it("should reject missing password", () => {
			const data = {
				email: "test@example.com",
			};

			const result = loginSchema.safeParse(data);
			expect(result.success).toBe(false);
		});

		it("should reject password shorter than 6 characters", () => {
			const data = {
				email: "test@example.com",
				password: "12345",
			};

			const result = loginSchema.safeParse(data);
			expect(result.success).toBe(false);
			if (!result.success) {
				const passwordError = result.error.issues.find(
					(issue) => issue.path[0] === "password"
				);
				expect(passwordError?.message).toBe(
					"Password must be at least 6 characters"
				);
			}
		});

		it("should accept password exactly 6 characters", () => {
			const data = {
				email: "test@example.com",
				password: "123456",
			};

			const result = loginSchema.safeParse(data);
			expect(result.success).toBe(true);
		});

		it("should accept long passwords", () => {
			const data = {
				email: "test@example.com",
				password: "this-is-a-very-long-password-123456789",
			};

			const result = loginSchema.safeParse(data);
			expect(result.success).toBe(true);
		});
	});

	describe("Type checking", () => {
		it("should reject non-string email", () => {
			const data = {
				email: 123,
				password: "password123",
			};

			const result = loginSchema.safeParse(data);
			expect(result.success).toBe(false);
		});

		it("should reject non-string password", () => {
			const data = {
				email: "test@example.com",
				password: 123456,
			};

			const result = loginSchema.safeParse(data);
			expect(result.success).toBe(false);
		});

		it("should reject boolean values", () => {
			const data = {
				email: true,
				password: false,
			};

			const result = loginSchema.safeParse(data);
			expect(result.success).toBe(false);
		});
	});

	describe("Both fields validation", () => {
		it("should reject when both fields are missing", () => {
			const data = {};

			const result = loginSchema.safeParse(data);
			expect(result.success).toBe(false);
			if (!result.success) {
				expect(result.error.issues).toHaveLength(2);
			}
		});
	});
});
