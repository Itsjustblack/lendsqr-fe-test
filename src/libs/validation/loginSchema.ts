import { z } from "zod";

export const loginSchema = z.object({
	email: z.email({ error: "Invalid email format" }),

	password: z
		.string({ error: "Password is required" })
		.min(1, "Password is required")
		.min(6, "Password must be at least 6 characters"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
