import { z } from "zod";

// Messages are translation keys, resolved in the UI via t(`contact.form.errors.${key}`)
export const contactSchema = z.object({
  name: z.string().trim().min(1, "nameRequired").max(100, "tooLong"),
  email: z
    .string()
    .trim()
    .min(1, "emailRequired")
    .email("emailInvalid")
    .max(254, "tooLong"),
  company: z.string().trim().max(100, "tooLong").optional(),
  service: z.string().trim().min(1, "serviceRequired").max(100, "tooLong"),
  message: z.string().trim().min(1, "messageRequired").max(5000, "tooLong"),
});

export type ContactFormData = z.infer<typeof contactSchema>;
export type ContactField = keyof ContactFormData;

export const CONTACT_FIELDS: ContactField[] = [
  "name",
  "email",
  "company",
  "service",
  "message",
];
