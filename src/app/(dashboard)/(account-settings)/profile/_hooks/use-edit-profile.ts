import { useMutation } from "@tanstack/react-query";
import { UserInput } from "@/lib/schemes/auth.schema";
import { editProfile } from "../_actions/profile";

export const useEditProfile = () => {
    return useMutation({
        mutationFn: async (data: UserInput) => {
            return await editProfile(data);
        },
    });
};