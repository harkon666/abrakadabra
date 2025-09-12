import { z } from "zod";

export const customerFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name is required!",
  }),
  email: z
    .string()
    .min(2, {
      message: "Email is required!",
    })
    .email({ message: "Invalid email address." }),
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits." })
    .regex(/^\d+$/, { message: "Phone number must contain only digits." }),
  city: z.string().min(2, {
    message: "City is required!",
  }),
  zipCode: z.string().optional(),
  address: z.string().min(2, {
    message: "Address is required!",
  }),
  address2: z.string().optional(),
  fax: z
    .string()
    .regex(/^\d+$/, { message: "Fax number must contain only digits." }),
});
