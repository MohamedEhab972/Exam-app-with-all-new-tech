import { useMutation } from "@tanstack/react-query";



// Forgot Password
export const useForgotPassword = () => {
    return useMutation({
        mutationFn: async (email: string) => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/forgotPassword`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || "Failed to send reset code");
            }

            return res.json();
        },
    });
};

// Verify Reset Code
export const useVerifyResetCode = () => {
    return useMutation({
        mutationFn: async (resetCode: string) => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/verifyResetCode`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ resetCode }),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || "Invalid or expired reset code");
            }

            return res.json();
        },
    });
};

// Reset Password
export const useResetPassword = () => {
    return useMutation({
        mutationFn: async ({
            email,
            newPassword,
        }: {
            email: string;
            newPassword: string;
        }) => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/resetPassword`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, newPassword }),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || "Failed to reset password");
            }

            return res.json();
        },
    });
};
