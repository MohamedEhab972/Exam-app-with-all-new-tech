"use client";

import { useMutation } from "@tanstack/react-query";
import { forgotPassword, verifyResetCode, resetPassword } from "@/app/(auth)/_actions/auth";
import { ForgotPasswordInput, ResetPasswordInput, VerifyCodeInput } from "@/lib/schemes/auth.schema";

export const useForgotPassword = () => {
    return useMutation({
        mutationFn: (email: ForgotPasswordInput["email"]) => forgotPassword(email),
    });
};

export const useVerifyResetCode = () => {
    return useMutation({
        mutationFn: (resetCode: VerifyCodeInput["resetCode"]) => verifyResetCode(resetCode),
    });
};

export const useResetPassword = () => {
    return useMutation({
        mutationFn: (data: ResetPasswordInput) =>
            resetPassword(data),
    });
};
