// src/hooks/useCheckAnswers.ts
import { AnswerPayload } from "@/types/exams";
import { useMutation } from "@tanstack/react-query";
import { checkAnswersAction } from "../_action/exam";


export const useCheckAnswers = () => {
    return useMutation({
        mutationFn: async (data: AnswerPayload) => {
            return await checkAnswersAction(data);
        },
    });
};
