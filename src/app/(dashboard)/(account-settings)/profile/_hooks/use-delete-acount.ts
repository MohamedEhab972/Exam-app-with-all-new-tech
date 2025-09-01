import { useMutation } from "@tanstack/react-query";
import { deleteAccount } from "../_actions/profile";

export const useDeleteMe = () => {
    return useMutation({
        mutationFn: async () => {
            return await deleteAccount();
        },
    });
};
