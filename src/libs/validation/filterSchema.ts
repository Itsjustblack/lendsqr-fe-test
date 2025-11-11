import { z } from "zod";

// Helper for optional string fields that accept empty strings
const optionalString = z
	.string()
	.transform((val) => (val === "" ? undefined : val))
	.optional();

// Email validation - accepts valid email format or empty string
const emailField = z
	.string()
	.refine(
		(val) => val === "" || z.string().email().safeParse(val).success,
		{ message: "Invalid email format" }
	)
	.transform((val) => (val === "" ? undefined : val))
	.optional();

// Phone number validation - flexible format that accepts common patterns
const phoneField = z
	.string()
	.refine(
		(val) =>
			val === "" ||
			/^[\d\s\-+()]+$/.test(val), // Allows digits, spaces, hyphens, plus, parentheses
		{ message: "Invalid phone number format" }
	)
	.transform((val) => (val === "" ? undefined : val))
	.optional();

// Date validation - accepts YYYY-MM-DD format or empty string
const dateField = z
	.string()
	.refine(
		(val) => val === "" || /^\d{4}-\d{2}-\d{2}$/.test(val),
		{ message: "Invalid date format (use YYYY-MM-DD)" }
	)
	.transform((val) => (val === "" ? undefined : val))
	.optional();

// Status validation - must be one of the valid user statuses or empty
const statusField = z
	.string()
	.refine(
		(val) =>
			val === "" ||
			["active", "inactive", "pending", "blacklisted"].includes(val),
		{ message: "Invalid status value" }
	)
	.transform((val) => (val === "" ? undefined : val))
	.optional();

export const filterSchema = z.object({
	username: optionalString,
	email: emailField,
	date: dateField,
	phoneNumber: phoneField,
	organization: optionalString,
	status: statusField,
});

export type FilterFormValues = z.infer<typeof filterSchema>;
