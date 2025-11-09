import { z } from "zod";
import type { UserStatus } from "../../types/user";

/**
 * Allowed organization values
 */
const organizationValues = ["lendsqr", "lendstar", "irorun"] as const;

/**
 * Allowed status values derived from UserStatus type
 */
const statusValues: readonly UserStatus[] = [
	"active",
	"inactive",
	"pending",
	"blacklisted",
] as const;

/**
 * Zod schema for table filter values
 * All fields are optional as filters can be applied partially
 */
export const filterSchema = z.object({
	username: z
		.string()
		.trim()
		.max(100, "Username must be less than 100 characters")
		.optional()
		.default(""),

	email: z
		.string()
		.trim()
		.refine((val) => val === "" || z.string().email().safeParse(val).success, {
			message: "Invalid email format",
		})
		.optional()
		.default(""),

	date: z
		.string()
		.refine(
			(val) => {
				if (val === "") return true;
				// Validate ISO date format (YYYY-MM-DD)
				const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
				if (!dateRegex.test(val)) return false;
				// Check if it's a valid date
				const date = new Date(val);
				return !isNaN(date.getTime());
			},
			{
				message: "Invalid date format. Expected YYYY-MM-DD",
			}
		)
		.optional()
		.default(""),

	phoneNumber: z
		.string()
		.trim()
		.refine(
			(val) => {
				if (val === "") return true;
				// Basic phone number validation (allows digits, spaces, hyphens, parentheses, and +)
				const phoneRegex = /^[\d\s\-+()]+$/;
				return phoneRegex.test(val) && val.replace(/\D/g, "").length >= 10;
			},
			{
				message: "Invalid phone number format. Must contain at least 10 digits",
			}
		)
		.optional()
		.default(""),

	organization: z
		.union([z.enum(organizationValues), z.literal("")])
		.optional()
		.default(""),

	status: z
		.union([z.enum(statusValues), z.literal("")])
		.optional()
		.default(""),
});

/**
 * TypeScript type inferred from the Zod schema
 */
export type FilterValues = z.infer<typeof filterSchema>;

/**
 * Export allowed values for use in dropdowns
 */
export { organizationValues, statusValues };
