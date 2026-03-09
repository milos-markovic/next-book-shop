import z from "zod";

export const registerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters long"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(5, "Password must be at least 5 characters long"),
    confirmPassword: z
      .string()
      .min(5, "Confirm Password is required")
      .min(5, "Confirm Password must be at least 5 characters long"),
  })

export const loginSchema = z
  .object({
    email: z.string().min(2, "Name must be at least 2 characters long"),
    password: z.string().min(5, "Password must be at least 5 characters long"),
  })

export const createCategorySchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters long"),
  })

export const updateCategorySchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters long"),
  })

export const createBookSchema = z
  .object({
    title: z.string().min(2, "Title must be at least 2 characters long"),
    author: z.string().min(2, "Author must be at least 2 characters long"),
    description: z.string().min(10, "Description must be at least 10 characters long"),
    price: z.number().positive("Price must be a positive number"),
    category: z.string().min(2, "Category must be at least 2 characters long"),
    img: z.file(),
    publisher: z.string().min(2, "Publisher must be at least 2 characters long"),
    pages: z.string().regex(/^\d+$/, "Pages must be a valid number"),
    format: z.string().min(2, "Format must be at least 2 characters long"),
    year: z.string().regex(/^\d{4}$/, "Year must be a valid 4-digit year"),
    letter: z.string().min(1, "Letter is required"),
    binding: z.string().min(1, "Binding is required"),
    filter: z.string().optional(),
  })  

export const updateBookSchema = z
  .object({
    title: z.string().min(2, "Title must be at least 2 characters long"),
    author: z.string().min(2, "Author must be at least 2 characters long"),
    description: z.string().min(10, "Description must be at least 10 characters long"),
    price: z.number().positive("Price must be a positive number"),
    category: z.string().min(2, "Category must be at least 2 characters long"),
    img: z.file().optional(),
    publisher: z.string().min(2, "Publisher must be at least 2 characters long"),
    pages: z.string().regex(/^\d+$/, "Pages must be a valid number"),
    format: z.string().min(2, "Format must be at least 2 characters long"),
    year: z.string().regex(/^\d{4}$/, "Year must be a valid 4-digit year"),
    letter: z.string().min(1, "Letter is required"),
    binding: z.string().min(1, "Binding is required"),
    inPreparation: z.boolean(),
    filter: z.string().optional(),
  })  

export const userDataSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters long"),
    email: z.string().email("Invalid email address"),
    address: z.string().min(2, "Name must be at least 2 characters long"),
    phone: z.string().min(2, "Name must be at least 2 characters long"), 
  })  

export const paymentMethodDataSchema = z
  .object({
    paymentMethod: z.string().min(1, "Payment type is required"),
  })  

export const createFlterSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters long"),
  })

export const updateFilterSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters long"),
  })

export type formActionState = {
  success: boolean;
  errors?: Record<string, string[]>;
};

export const initialState: formActionState = {
  success: false,
  errors: {},
};