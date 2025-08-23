// src/app/(dashboard)/_components/breadcrumbs.tsx
"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Breadcrumbs() {
    const pathname = usePathname();
    const segments = pathname.split("/").filter(Boolean); // remove empty values

    return (
        <p className="geist-mono-regular text-[#9CA3AF] p-4">
            {segments.length === 0 ? (
                "Home"
            ) : (
                <>
                    <Link href="/" className="hover:underline">Home</Link>
                    {segments.map((seg, idx) => {
                        const isLast = idx === segments.length - 1;
                        const href = "/" + segments.slice(0, idx + 1).join("/");

                        return (
                            <span key={seg}>
                                {" / "}
                                {isLast ? (
                                    <span className="text-primary capitalize">{seg}</span>
                                ) : (
                                    <Link href={href} className="hover:underline capitalize">
                                        {seg}
                                    </Link>
                                )}
                            </span>
                        );
                    })}
                </>
            )}
        </p>
    );
}
