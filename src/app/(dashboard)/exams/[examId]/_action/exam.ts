"use server";

import { getAccessToken } from "@/lib/utils/auth.util";
import { AnswerPayload } from "@/types/exams";


export const checkAnswersAction = async (payload: AnswerPayload) => {
    const token = await getAccessToken();
    console.log(token);

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/questions/check`,
        {
            method: "POST",
            headers: {
                token: token || "",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        }
    );


    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to check answers");
    }

    return res.json();
};
