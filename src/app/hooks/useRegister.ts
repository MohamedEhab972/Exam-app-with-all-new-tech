
import { useMutation } from "@tanstack/react-query";
import { RegisterInput } from "@/lib/validations/auth";

export const useRegister = () => {
    return useMutation({
        mutationFn: async (data: RegisterInput) => {
            const res = await fetch("https://exam.elevateegy.com/api/v1/auth/signup", {
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

            return res.json();
        },
    });
};
