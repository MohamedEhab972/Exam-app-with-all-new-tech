"use server";

import { getAccessToken } from "@/lib/utils/auth.util";
import { UserInput } from "@/lib/schemes/auth.schema";

export async function editProfile(data: UserInput) {
    const token = await getAccessToken();
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/auth/editProfile`,
        {
            headers: {
                token: token || "",
                "Content-Type": "application/json"
            },
            method: "PUT",
            body: JSON.stringify(data),
        }
    );

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to update profile");
    }

    return res.json();
}


export async function deleteAccount() {
    const token = await getAccessToken();

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/auth/deleteMe`,
        {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                token: token || "",
            },
        }
    );

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to delete account");
    }

    return res.json();
}