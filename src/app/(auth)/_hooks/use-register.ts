"use client";


import { useMutation } from "@tanstack/react-query";
import { RegisterInput } from "@/lib/validations/auth";
import { registerAction } from "../_actions/auth";

export const useRegister = () => {
    return useMutation({
        mutationFn: async (data: RegisterInput) => {
            return await registerAction(data);
        },
    });
};
