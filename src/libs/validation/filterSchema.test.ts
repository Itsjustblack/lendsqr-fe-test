import { describe, expect, it } from "vitest";
import { filterSchema } from "./filterSchema";

describe("filterSchema", () => {
	describe("Valid inputs", () => {
		it("should accept valid filter values", () => {
			const validData = {
				username: "john_doe",
				email: "john@example.com",
				date: "2024-01-15",
				phoneNumber: "+2349035346479",
				organization: "Lendsqr",
				status: "active",
			};

			const result = filterSchema.safeParse(validData);
			expect(result.success).toBe(true);
			if (result.success) {
				expect(result.data).toEqual(validData);
			}
		});

		it("should accept partial filter values", () => {
			const partialData = {
				username: "jane_doe",
				status: "pending",
			};

			const result = filterSchema.safeParse(partialData);
			expect(result.success).toBe(true);
			if (result.success) {
				expect(result.data.username).toBe("jane_doe");
				expect(result.data.status).toBe("pending");
			}
		});

		it("should accept empty object", () => {
			const emptyData = {};

			const result = filterSchema.safeParse(emptyData);
			expect(result.success).toBe(true);
		});
	});

	describe("Empty string transformation", () => {
		it("should transform empty string to undefined for all fields", () => {
			const data = {
				username: "",
				email: "",
				date: "",
				phoneNumber: "",
				organization: "",
				status: "",
			};

			const result = filterSchema.safeParse(data);
			expect(result.success).toBe(true);
			if (result.success) {
				expect(result.data.username).toBeUndefined();
				expect(result.data.email).toBeUndefined();
				expect(result.data.date).toBeUndefined();
				expect(result.data.phoneNumber).toBeUndefined();
				expect(result.data.organization).toBeUndefined();
				expect(result.data.status).toBeUndefined();
			}
		});

		it("should transform mixed empty and non-empty strings correctly", () => {
			const data = {
				username: "john",
				email: "",
				status: "active",
				organization: "",
			};

			const result = filterSchema.safeParse(data);
			expect(result.success).toBe(true);
			if (result.success) {
				expect(result.data.username).toBe("john");
				expect(result.data.email).toBeUndefined();
				expect(result.data.status).toBe("active");
				expect(result.data.organization).toBeUndefined();
			}
		});
	});

	describe("Type checking", () => {
		it("should reject non-string values", () => {
			const data = {
				username: 123, // number instead of string
			};

			const result = filterSchema.safeParse(data);
			expect(result.success).toBe(false);
		});

		it("should reject boolean values", () => {
			const data = {
				email: true, // boolean instead of string
			};

			const result = filterSchema.safeParse(data);
			expect(result.success).toBe(false);
		});

		it("should reject array values", () => {
			const data = {
				status: ["active", "pending"], // array instead of string
			};

			const result = filterSchema.safeParse(data);
			expect(result.success).toBe(false);
		});

		it("should reject object values", () => {
			const data = {
				organization: { name: "Lendsqr" }, // object instead of string
			};

			const result = filterSchema.safeParse(data);
			expect(result.success).toBe(false);
		});
	});

	describe("Validation errors", () => {
		describe("Email validation", () => {
			it("should reject invalid email format", () => {
				const data = { email: "not-an-email" };
				const result = filterSchema.safeParse(data);

				expect(result.success).toBe(false);
				if (!result.success) {
					expect(result.error.issues[0].message).toBe("Invalid email format");
				}
			});

			it("should accept valid email formats", () => {
				const validEmails = [
					"test@example.com",
					"user.name@example.co.uk",
					"user+tag@example.com",
				];

				validEmails.forEach((email) => {
					const result = filterSchema.safeParse({ email });
					expect(result.success).toBe(true);
				});
			});
		});

		describe("Phone number validation", () => {
			it("should accept valid phone formats", () => {
				const validPhones = ["+2349012323345", "09012323342"];

				validPhones.forEach((phoneNumber) => {
					const result = filterSchema.safeParse({ phoneNumber });
					expect(result.success).toBe(true);
				});
			});
		});

		describe("Date validation", () => {
			it("should reject invalid date format", () => {
				const data = { date: "01/15/2024" };
				const result = filterSchema.safeParse(data);

				expect(result.success).toBe(false);
				if (!result.success) {
					expect(result.error.issues[0].message).toBe(
						"Invalid date format (use YYYY-MM-DD)"
					);
				}
			});

			it("should accept valid YYYY-MM-DD format", () => {
				const validDates = ["2024-01-15", "2023-12-31", "2024-06-30"];

				validDates.forEach((date) => {
					const result = filterSchema.safeParse({ date });
					expect(result.success).toBe(true);
				});
			});
		});

		describe("Status validation", () => {
			it("should reject invalid status value", () => {
				const data = { status: "invalid-status" };
				const result = filterSchema.safeParse(data);

				expect(result.success).toBe(false);
				if (!result.success) {
					expect(result.error.issues[0].message).toBe("Invalid status value");
				}
			});

			it("should accept all valid status values", () => {
				const validStatuses = ["active", "inactive", "pending", "blacklisted"];

				validStatuses.forEach((status) => {
					const result = filterSchema.safeParse({ status });
					expect(result.success).toBe(true);
				});
			});
		});
	});

	describe("Real-world scenarios", () => {
		it("should handle form submission with some filled fields", () => {
			const formData = {
				username: "john_doe",
				email: "",
				date: "",
				phoneNumber: "",
				organization: "Lendsqr",
				status: "active",
			};

			const result = filterSchema.safeParse(formData);
			expect(result.success).toBe(true);
			if (result.success) {
				// Only non-empty fields should have values
				expect(result.data.username).toBe("john_doe");
				expect(result.data.organization).toBe("Lendsqr");
				expect(result.data.status).toBe("active");
				// Empty fields should be undefined
				expect(result.data.email).toBeUndefined();
				expect(result.data.date).toBeUndefined();
				expect(result.data.phoneNumber).toBeUndefined();
			}
		});
	});
});
