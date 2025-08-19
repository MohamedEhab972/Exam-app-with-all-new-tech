import { z } from "zod";

export const loginSchema = z.object({
    email: z
        .email("Invalid email")
        .nonempty("Email is required"),
    password: z
        .string()
        .nonempty("Password is required")
        .min(6, "Password must be at least 6 chars"),
});

export type LoginInput = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
    username: z.string().nonempty("Username is required"),
    firstName: z.string().nonempty("First name is required"),
    lastName: z.string().nonempty("Last name is required"),
    email: z.email("Invalid email").nonempty("Email is required"),
    password: z.string().nonempty("Password is required").min(6, "Password must be at least 6 chars"),
    rePassword: z.string().nonempty("Confirm password is required"),
    phone: z
        .string()
        .nonempty("Phone is required")
        .regex(/^\+\d{6,15}$/, "Invalid phone number"),
}).refine((data) => data.password === data.rePassword, {
    message: "Passwords don't match",
    path: ["rePassword"],
});

export type RegisterInput = z.infer<typeof registerSchema>;


export const forgotPasswordSchema = loginSchema.pick({ email: true });
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;

export const verifyCodeSchema = z.object({
    resetCode: z.string().nonempty("Reset code is required"),
});
export type VerifyCodeInput = z.infer<typeof verifyCodeSchema>;

export const resetPasswordSchema = z.object({
    email: loginSchema.shape.email,
    newPassword: loginSchema.shape.password,
});
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
