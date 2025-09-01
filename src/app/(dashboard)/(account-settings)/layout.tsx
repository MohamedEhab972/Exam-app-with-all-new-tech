import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "../_components/sidebar";


export const metadata = {
    title: "Account Settings",
};

export default function AcountLayout({ children, }: { children: React.ReactNode }) {
    return (
        <SidebarProvider className="pt-6 gap-6">
            <AppSidebar isfixed={false} />
            <div className="flex-1 bg-white p-6">
                {children}
            </div>
        </SidebarProvider>
    );
}
