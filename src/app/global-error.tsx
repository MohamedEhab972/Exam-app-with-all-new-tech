"use client";

import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error("Global error caught:", error);
    }, [error]);

    return (
        <html>
            <body className="flex items-center justify-center h-screen bg-muted">
                <Card className="max-w-md w-full shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-red-600">Something went wrong!</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">
                            {error.message || "An unexpected error occurred."}
                        </p>
                        <Button variant="default" onClick={() => reset()}>
                            Try again
                        </Button>
                    </CardContent>
                </Card>
            </body>
        </html>
    );
}
