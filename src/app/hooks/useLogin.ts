"use client";

import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import { LoginInput } from "@/lib/validations/auth";

export function useLogin() {
    return useMutation({
        mutationFn: async (data: LoginInput) => {
            const res = await signIn("credentials", {
                redirect: false,
                email: data.email,
                password: data.password,
            });

            if (res?.error) {
                throw new Error(res.error);
            }
            return res;
        },
    });
}
