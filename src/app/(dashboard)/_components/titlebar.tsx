"use client";

import { usePathname } from "next/navigation";
import { BookOpenCheck, CircleQuestionMark, GraduationCap, UserRound } from "lucide-react";
import React from "react";
import { useExamStore } from "@/store/useExamStore";

const items = [
    { title: "Diplomas", url: "/", icon: GraduationCap },
    { title: "Account Settings", url: "/account-settings", icon: UserRound },
    { title: "Exams", url: "/exams", icon: BookOpenCheck },
];

export default function Titlebar() {
    const pathname = usePathname();
    const { quizTitle } = useExamStore();

    let title = "Account Settings";
    let Icon = CircleQuestionMark;

    if (!pathname || pathname === "/") {
        title = "Diplomas";
        Icon = GraduationCap;
    } else if (pathname.toLowerCase() === "/exams") {
        title = "Exams";
        Icon = BookOpenCheck;
    } else if (pathname.toLowerCase().startsWith("/exams/")) {
        title = `[${quizTitle || "Quiz"}] Questions`;
        Icon = BookOpenCheck;
    }

    return (
        <div className="flex items-center gap-4 p-4 bg-primary geist-mono-semibold text-white flex-1">
            <Icon className="w-11 h-11 text-white" />
            <h1 className="text-2xl font-bold">{title}</h1>
        </div>
    );
}
