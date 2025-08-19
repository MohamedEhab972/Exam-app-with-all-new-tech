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
        <div className="flex h-screen backdrop-blur-[200px]">
            <section className="w-6/12">
                <LeftSideAuth />
            </section>
            <section className="flex justify-center items-center w-6/12">
                {children}
            </section>
        </div>
    );
}
