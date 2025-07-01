import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const signUpSchema = z.object({
  username: z
    .string()
    .min(3, "Username too small")
    .max(50, "Username too long"),
  email: z.string().email(),
  password: z
    .string()
    .min(6)
    .max(100)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),

  confirmPassword: z.string(),

  phone: z
    .string()
    .min(10, "Phone number too short")
    .max(15, "Phone number too long")
    .regex(/^\+?[0-9]{10,15}$/, "Invalid phone number"),
});
