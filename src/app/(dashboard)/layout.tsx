import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";
import { AppSidebar } from "./_components/sidebar";
import { Providers } from "../providers";
import Breadcrumbs from "./_components/breadcrumbs";

export const metadata = {
    title: "Dashboard Pages",
};

export default function DashboardLayout({ children, }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="p-6 flex-1 flex flex-col">
                <Breadcrumbs />
                <Providers>
                    {children}
                </Providers>
            </main>
        </SidebarProvider>
    );
}
