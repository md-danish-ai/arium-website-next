import { z } from "zod";

export const contactFormSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, "First name is required")
    .min(2, "First name must be at least 2 characters"),
  lastName: z
    .string()
    .trim()
    .min(1, "Last name is required")
    .min(2, "Last name must be at least 2 characters"),
  company: z.string().trim().min(1, "Organization is required"),
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Please enter a valid work email address"),
  phone: z
    .string()
    .trim()
    .min(1, "Phone number is required")
    .refine((val) => {
      const digits = val.replace(/\D/g, "");
      return digits.length >= 7 && digits.length <= 15 && /^[+]?[\d\s().-]+$/.test(val);
    }, "Please enter a valid phone number"),
  postalCode: z
    .string()
    .trim()
    .min(1, "Postal code is required")
    .refine((val) => /^[a-zA-Z0-9\s-]{3,10}$/.test(val), "Please enter a valid postal code"),
  interest: z.string().min(1, "Please select who you are reaching out to"),
  comments: z
    .string()
    .trim()
    .min(1, "Message is required")
    .min(10, "Please provide at least 10 characters in your message"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
