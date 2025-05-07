import { z } from "zod";

export const userSchema = z.object({
  name: z.string().nullable().optional(),
  email: z
    .string({
      required_error: "Email field is required",
    })
    .email({ message: "Invalid email format" }),
  role: z.string().nullable().optional(),
  password: z.string({
    required_error : "Password field is required"
  }).min(6, "Password must be at least 6 characters"),
});

export type UserModel = z.infer<typeof userSchema>;
