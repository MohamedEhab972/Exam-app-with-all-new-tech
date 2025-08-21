"use client";

import { usePathname } from "next/navigation";
import { GraduationCap, UserRound } from "lucide-react";
import React from "react";

const items = [
    { title: "Diplomas", url: "/diplomas", icon: GraduationCap },
    { title: "Account Settings", url: "/account-settings", icon: UserRound },
];

export default function Titlebar() {
    const pathname = usePathname();


    const currentItem = items.find(
        (item) => item.url.toLowerCase() === pathname.toLowerCase()
    );

    return (
        <div className="flex items-center gap-4 p-4 bg-primary geist-mono-semibold text-white">
            {currentItem?.icon && <currentItem.icon className="w-11 h-11 text-white" />}
            <h1 className="text-2xl font-bold">{currentItem?.title || "Page"}</h1>
        </div>
    );
}
