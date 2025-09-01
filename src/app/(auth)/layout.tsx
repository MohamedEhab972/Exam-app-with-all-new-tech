import React from "react";
import LeftSideAuth from "./_components/leftSide-auth";

export const metadata = {
    title: "Auth Pages",
};

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main className="flex h-screen backdrop-blur-[200px]">

            <aside className="w-6/12">
                <LeftSideAuth />
            </aside>

            <section
                className="flex justify-center items-center w-6/12"
                aria-label="Authentication Form"
            >
                {children}
            </section>
        </main>
    );
}
