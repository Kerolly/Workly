// signUpSchema.js

import {z} from 'zod';


export const signUpSchema = z.object({
    firstName: z.string().min(2, "Please enter a valid name").max(20, "Please enter a valid name").optional(),
    lastName: z.string().min(2, "Please enter a valid name").max(20, "Please enter a valid name").optional(),
    email: z.string().email("Please enter a valid email").optional(),
    password: z.string().min(8, "Please enter a minimum of 8 characters").optional(),
    role: z.string("Please select a role").optional(),
    phone: z.number().optional()
});

