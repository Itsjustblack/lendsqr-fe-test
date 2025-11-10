import { z } from "zod";

const nullableString = z
	.string()
	.transform((val) => (val === "" ? undefined : val))
	.nullish();
//TODO: Fix Schema Issue
export const filterSchema = z.object({
	username: nullableString,

	email: nullableString,

	date: nullableString,

	phoneNumber: nullableString,

	organization: nullableString,

	status: nullableString,
});

export type FilterFormValues = z.infer<typeof filterSchema>;
