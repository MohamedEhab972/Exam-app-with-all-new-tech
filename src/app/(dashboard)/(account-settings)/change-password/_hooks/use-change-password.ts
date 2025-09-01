import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { changePassword } from "../_actions/change-password";

export const useChangePassword = () => {
    return useMutation({
        mutationFn: changePassword,
        onSuccess: () => {
            toast.success("Password changed successfully!");
        },
        onError: (err: any) => {
            toast.error(err.message || "Failed to change password.");
        },
    });
};
