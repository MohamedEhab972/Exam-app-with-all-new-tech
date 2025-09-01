import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";
import { AppSidebar } from "./_components/sidebar";
import { Providers } from "../providers";
import Breadcrumbs from "./_components/breadcrumbs";
import Titlebar from "./_components/titlebar";
import BackButton from "./_components/back-button";
import { Toaster } from "@/components/ui/toaster";
import ToastProvider from "@/components/providers/toast.provider";

export const metadata = {
    title: "Dashboard Pages",
};


export default function DashboardLayout({ children, }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <AppSidebar isfixed={true} />
            <main className="p-6 pt-0 flex-1 flex flex-col min-h-screen bg-gray-50">
                <Breadcrumbs />
                <div className="flex items-center gap-4 mb-6">
                    <BackButton />
                    <Titlebar />
                </div>
                <Providers>
                    {children}
                    <ToastProvider />
                </Providers>
            </main>
        </SidebarProvider>
    );
}
