"use client";

import { usePathname } from "next/navigation";
import { BookOpenCheck, GraduationCap, UserRound } from "lucide-react";
import React from "react";

const items = [
    { title: "Diplomas", url: "/", icon: GraduationCap },
    { title: "Account Settings", url: "/account-settings", icon: UserRound },
    { title: "exams", url: "/exams", icon: BookOpenCheck },
];

export default function Titlebar() {
    const pathname = usePathname();

    console.log("Current Pathname:", pathname);



    const currentItem = items.find(
        (item) => item.url.toLowerCase() === pathname.toLowerCase()
    );

    return (
        <div className="flex items-center gap-4 p-4 bg-primary geist-mono-semibold text-white flex-1">
            {currentItem?.icon && <currentItem.icon className="w-11 h-11 text-white" />}
            <h1 className="text-2xl font-bold">{currentItem?.title || "Page"}</h1>
        </div>
    );
}
