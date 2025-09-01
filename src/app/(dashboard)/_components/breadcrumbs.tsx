"use client";

import { usePathname } from "next/navigation";
import { useExamStore } from "@/store/useExamStore";

export default function Breadcrumbs() {
    const pathname = usePathname();
    const segments = pathname.split("/").filter(Boolean);
    const { quizTitle } = useExamStore();

    return (
        <p className="geist-mono-regular text-[#9CA3AF] p-4">
            {segments.length === 0 ? (
                "Home"
            ) : (
                <>
                    <span className="capitalize">Home</span>
                    {segments.map((seg, idx) => {
                        const isLast = idx === segments.length - 1;

                        if (seg === "exams" && isLast) {
                            return (
                                <span key={seg}>
                                    {" / "}
                                    <span className="text-primary capitalize">{seg}</span>
                                </span>
                            );
                        }

                        if (isLast && segments.includes("exams")) {
                            return (
                                <span key={seg}>
                                    {" / "}
                                    <span className="text-primary capitalize">
                                        {quizTitle} / Questions
                                    </span>
                                </span>
                            );
                        }

                        return (
                            <span key={seg}>
                                {" / "}
                                <span className={`capitalize ${isLast ? "text-primary" : ""}`}>
                                    {seg}
                                </span>
                            </span>
                        );
                    })}
                </>
            )}
        </p>
    );
}
