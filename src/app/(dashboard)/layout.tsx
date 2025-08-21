import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";
import { AppSidebar } from "./_components/sidebar";
import { Providers } from "../providers";
import Titlebar from "./_components/titlebar";

export const metadata = {
    title: "Dashboard Pages",
};

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="p-6 flex-1 flex flex-col">
                <p className="geist-mono-regular text-[#9CA3AF] p-4">Home</p>
                <Titlebar />
                <Providers>
                    {children}
                </Providers>
            </main>
        </SidebarProvider>
    );
}
