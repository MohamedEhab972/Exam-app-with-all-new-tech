"use client";

import { Card, CardContent } from "@/components/ui/card";

export default function LoadingSubjects() {
    return (
        <section className="p-6 space-y-6">
            <div className="h-8 w-48 bg-gray-200 rounded animate-pulse"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {Array.from({ length: 6 }).map((_, i) => (
                    <Card key={i} className="overflow-hidden shadow-lg animate-pulse h-[448px] relative">
                        <CardContent className="p-0">
                            <div className="bg-gray-300 w-full h-full rounded-md" />
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    );
}
