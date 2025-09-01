"use client";


import { useMutation } from "@tanstack/react-query";
import { UserInput } from "@/lib/schemes/auth.schema";
import { registerAction } from "../../_actions/auth";

export const useRegister = () => {
    return useMutation({
        mutationFn: async (data: UserInput) => {
            return await registerAction(data);
        },
    });
};

