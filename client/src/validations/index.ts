import * as z from "zod";

export const textSchema = z.object({
	text: z
		.string()
		.min(1, "Text content is required")
		.max(5000, "Text content must not exceed 5000 characters"),
});
export type TextFormData = z.infer<typeof textSchema>;