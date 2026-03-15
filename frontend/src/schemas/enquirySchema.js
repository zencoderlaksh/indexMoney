import { z } from "zod";

export const enquirySchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .min(3, "Name must be at least 3 characters"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^\d{10}$/, "Phone number must be exactly 10 digits"),
  planType: z
    .string()
    .min(1, "Please select a plan")
    .refine((value) => !!value, {
      message: "Please select a plan",
    }),
  agreePolicy: z.literal(true, {
    errorMap: () => ({ message: "You must agree to the policy" }),
  }),
});
