import { z } from "zod";

export const categorySchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters"),
  color: z
    .string()
    .min(1, "Color is required")
    .regex(/^#[0-9A-F]{6}$/i, "Color must be a valid hex color"),
  icon: z.string().min(1, "Icon is required"),
  type: z.enum(["income", "expense"], {
    required_error: "Please select a category type",
  }),
});

export type CategoryFormData = z.infer<typeof categorySchema>;
