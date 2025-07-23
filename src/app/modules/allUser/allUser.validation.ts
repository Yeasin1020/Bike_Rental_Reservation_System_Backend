import { z } from 'zod';

const AllUserValidationSchema = z.object({
	body: z.object({
		name: z.string().min(1, { message: 'Name is required' }).trim(),
		email: z.string().email({ message: 'Invalid email address' }).trim(),
		phone: z.string().min(1, { message: 'Phone number is required' }).trim(),
		address: z.string().min(1, { message: 'Address is required' }).trim(),
		role: z.string().min(1, { message: 'Role is required' }).trim(),
	}),
});

export const AllUserValidation = {
	AllUserValidationSchema,
};
