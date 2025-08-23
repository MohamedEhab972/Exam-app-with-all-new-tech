"use server";

import { ForgotPasswordInput, RegisterInput, ResetPasswordInput, VerifyCodeInput } from "@/lib/validations/auth";

export async function forgotPassword(email: ForgotPasswordInput["email"]) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/auth/forgotPassword`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
    });

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to send reset code");
    }

    return res.json();
}

export async function verifyResetCode(resetCode: VerifyCodeInput["resetCode"]) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/auth/verifyResetCode`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resetCode }),
    });

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Invalid or expired reset code");
    }

    return res.json();
}

export async function resetPassword(data: ResetPasswordInput) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/auth/resetPassword`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.email, newPassword: data.newPassword }),
    });

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to reset password");
    }

    return res.json();
}



export async function registerAction(data: RegisterInput) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/auth/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || "Something went wrong");
        }

        return await res.json();
    } catch (err: any) {
        throw new Error(err.message || "Failed to register");
    }
}
