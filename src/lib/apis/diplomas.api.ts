import { getAccessToken } from "@/lib/auth.token";
import { SubjectsResponse } from "@/types/subject";


export async function fetchSubjects(): Promise<SubjectsResponse> {
    const token = await getAccessToken();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/subjects`, {
        cache: "no-store",
        headers: {
            token: token || "",
        },
    });

    if (!res.ok) {
        throw new Error("Failed to fetch subjects");
    }

    return res.json();
}
