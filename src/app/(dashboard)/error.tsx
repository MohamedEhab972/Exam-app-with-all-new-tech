"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Error({ error, reset, }: { error: Error & { digest?: string }; reset: () => void; }) {
    const router = useRouter();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
            <h2 className="text-2xl font-semibold text-red-600">
                Something went wrong!
            </h2>
            <p className="text-gray-600">{error.message}</p>
            <div className="flex space-x-2">
                <Button variant="outline" onClick={() => reset()}>
                    Try Again
                </Button>
                <Button onClick={() => router.push("/login")}>
                    Go to Login
                </Button>
            </div>
        </div>
    );
}
