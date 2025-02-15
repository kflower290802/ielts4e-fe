import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({
    message: "Invalid email format!",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});
export const signUpSchema = z
  .object({
    email: z.string().email({
      message: "Invalid email format!",
    }),
    name: z.string().min(2, {
      message: "Full name must be at least 2 characters.",
    }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters." })
      .regex(/[A-Z]/, {
        message: "Password must contain at least 1 uppercase letter.",
      })
      .regex(/[0-9]/, { message: "Password must contain at least 1 number." })
      .regex(/[\W_]/, {
        message: "Password must contain at least 1 special character.",
      }),
    passwordConfirm: z
      .string()
      .min(8, { message: "Invalid password confirmation." }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords do not match.",
    path: ["passwordConfirm"],
  });
export type SignInPayload = z.infer<typeof loginSchema>;

export type SignUpPayload = z.infer<typeof signUpSchema>;
