"use client"

import { EllipsisVertical, FolderCode, GraduationCap, Home, Inbox, LogOut, Search, Settings, UserRound } from "lucide-react"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Image from "next/image"
import { useSession, signOut } from "next-auth/react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const items = [
    { title: "Diplomas", url: "/diplomas", icon: GraduationCap },
    { title: "Account Settings", url: "#", icon: UserRound },
]

export function AppSidebar() {
    const { data: session } = useSession()
    const pathname = usePathname();

    return (
        <Sidebar className="w-[362px] h-screen">
            <div className="p-10 flex flex-col h-full">
                <SidebarHeader>
                    <div className="flex items-center justify-between">
                        <Image
                            src="/images/logo.png"
                            alt="Logo"
                            width={192}
                            height={37}
                        />
                    </div>
                    <div className="flex gap-3 items-center">
                        <span className="text-primary" aria-hidden="true">
                            <FolderCode />
                        </span>
                        <h1 className="geist-mono-semibold font-mono !m-0 text-primary text-lg">
                            Exam App
                        </h1>
                    </div>
                </SidebarHeader>

                <SidebarContent className="flex-1 mt-15">
                    <SidebarGroup>
                        {/* <SidebarGroupLabel></SidebarGroupLabel> */}
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {items.map((item) => {
                                    const isActive = pathname.toLowerCase() === `/${item.title.toLowerCase()}`;
                                    return (
                                        <SidebarMenuItem
                                            key={item.title}
                                            className={`p-4 border text-primary geist-mono-regular 
                                            ${isActive ? "border-blue-500 bg-[#DBEAFE]" : "border-transparent"} `}
                                        >
                                            <SidebarMenuButton asChild>
                                                <Link
                                                    href={item.url}
                                                    className="flex w-full h-full items-center gap-2"
                                                >
                                                    <item.icon />
                                                    <span>{item.title}</span>
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    );
                                })}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>

                <SidebarFooter>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <SidebarMenuButton className="p-0 rounded-none flex items-center h-[54px]">
                                        <div className="relative w-[54px] h-[54px] overflow-hidden border-2 border-primary shrink-0">
                                            <Image
                                                src={
                                                    session?.user?.image ||
                                                    "/images/cb9358d489b7d9a2fbcfd109b058718b5287b696.jpg"
                                                }
                                                alt="User Avatar"
                                                width={54}
                                                height={54}
                                                className="object-cover w-[54px] h-[54px]"
                                            />
                                        </div>
                                        <div className="flex flex-col text-left ml-3 overflow-hidden">
                                            <span className="font-semibold truncate">
                                                {session?.user?.name || "Guest"}
                                            </span>
                                            <p className="text-sm text-muted-foreground truncate">
                                                {session?.user?.email || "No email"}
                                            </p>
                                        </div>
                                        <EllipsisVertical className="ml-auto" />
                                    </SidebarMenuButton>

                                </DropdownMenuTrigger>
                                <DropdownMenuContent side="top" className="w-[--radix-popper-anchor-width]">
                                    <DropdownMenuItem className="p-4">
                                        <UserRound size={104} strokeWidth={1.5} />
                                        Account
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="text-[#DC2626] p-4" onClick={() => signOut()}>
                                        <LogOut size={104} strokeWidth={1.5} className="transform -scale-x-100" />
                                        Logout
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarFooter>
            </div>
        </Sidebar >

    )
}
