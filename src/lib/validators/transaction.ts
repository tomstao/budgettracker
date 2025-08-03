import { z } from "zod";

export const transactionSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .min(2, "Title must be at least 2 characters")
    .max(100, "Title must be less than 100 characters"),
  amount: z
    .string()
    .min(1, "Amount is required")
    .refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0, {
      message: "Amount must be a positive number",
    }),
  type: z.enum(["income", "expense"], {
    required_error: "Please select a transaction type",
  }),
  categoryId: z.string().min(1, "Please select a category"),
  description: z
    .string()
    .max(500, "Description must be less than 500 characters")
    .optional(),
  date: z
    .string()
    .min(1, "Date is required")
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid date format",
    }),
});

export const transactionFiltersSchema = z.object({
  type: z.enum(["income", "expense"]).optional(),
  categoryId: z.string().optional(),
  dateFrom: z.string().optional(),
  dateTo: z.string().optional(),
  search: z.string().optional(),
  page: z.number().min(1).optional(),
  limit: z.number().min(1).max(100).optional(),
});

export type TransactionFormData = z.infer<typeof transactionSchema>;
export type TransactionFiltersFormData = z.infer<
  typeof transactionFiltersSchema
>;
