"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

type BackButtonProps = {
    fallback?: string;
    variant?: React.ComponentProps<typeof Button>["variant"];
    size?: React.ComponentProps<typeof Button>["size"];
};

export default function BackButton({
    fallback = "/",
    variant = "outline",
    size = "sm",
}: BackButtonProps) {
    const router = useRouter();

    const handleClick = () => {
        if (typeof window !== "undefined" && window.history.length > 1) {
            router.back();
        } else {
            router.push(fallback);
        }
    };

    return (
        <Button onClick={handleClick} variant={variant} size={size} className='w-[38px] flex justify-center items-center h-full border-primary rounded-none'>
            <ChevronLeft className="h-6 w-6 text-primary" />
        </Button>
    );
}
