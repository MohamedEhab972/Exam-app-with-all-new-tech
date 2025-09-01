"use server";

import { getAccessToken } from "@/lib/utils/auth.util";
import { ChangePasswordInput } from "@/lib/schemes/auth.schema";

export async function changePassword(data: ChangePasswordInput) {
    const token = await getAccessToken();

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/auth/changePassword`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                token: token || "",
            },
            body: JSON.stringify(data),
        }
    );

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to change password");
    }

    return res.json();
}