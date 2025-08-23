import { getAccessToken } from "@/lib/auth.token";
import { Exam, ExamsResponse } from "@/types/exams";

export async function getExams(): Promise<Exam[]> {
    const token = await getAccessToken();
    const res = await fetch("https://exam.elevateegy.com/api/v1/exams", {
        headers: {
            token: token || "",
        },
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Failed to fetch exams");
    }

    const data: ExamsResponse = await res.json();
    return data.exams;
}