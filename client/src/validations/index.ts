import * as z from "zod";

export const textSchema = z.object({
	text: z
		.string()
		.min(1, "Text content is required")
		.max(5000, "Text content must not exceed 5000 characters"),
});
export type TextFormData = z.infer<typeof textSchema>;

export const registerSchema = z.object({
	email: z.string().email({ message: 'Invalid email address' }),
	password: z.string()
		.min(8, { message: 'Password must be at least 8 characters long' })
		.max(100, { message: 'Password cannot exceed 100 characters' }),
	firstName: z.string()
		.min(1, { message: 'First Name is required' })
		.max(50, { message: 'First Name cannot exceed 50 characters' }),
	lastName: z.string()
		.min(1, { message: 'Last Name is required' })
		.max(50, { message: 'Last Name cannot exceed 50 characters' }),
});

export type RegisterFormData = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
	email: z.string().email({ message: 'Invalid email address' }),
	password: z.string()
		.min(1, { message: 'Password is required' })
});

export type LoginFormData = z.infer<typeof loginSchema>;