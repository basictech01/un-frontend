"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import {
  ChevronUp,
  LogOut,
  UserCircle,
  FileText,
  Users,
  LayoutDashboard,
  Clock,
  Settings,
} from "lucide-react";

const menuItems = [
  { title: "Dashboard", icon: LayoutDashboard, href: "/admin" },
  { title: "Articles", icon: FileText, href: "/admin/articles" },
  { title: "Pending", icon: Clock, href: "/admin/pending" },
  { title: "Users", icon: Users, href: "/admin/users" },
  { title: "Profile", icon: UserCircle, href: "/admin/profile" },
];

function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="offcanvas" className="border-r" style={{
      borderColor: 'hsl(var(--color-border))',
      backgroundColor: 'hsl(var(--color-card))'
    }}>
      <SidebarHeader className="border-b px-6 py-4 flex-shrink-0" style={{
        borderColor: 'hsl(var(--color-border))',
        backgroundColor: 'transparent'
      }}>
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className="relative h-14 w-14 overflow-hidden rounded-lg">
              <Image
                src="/logo/image.png"
                alt="Uttrakhand News"
                fill
                className="object-contain"
              />
            </div>
            <div>
              <p className="text-base font-bold" style={{ color: 'hsl(var(--color-foreground))' }}>
                Uttrakhand News
              </p>
              <p className="text-xs" style={{ color: 'hsl(var(--color-muted-foreground))' }}>
                Admin Panel
              </p>
            </div>
          </div>
          <SidebarTrigger className="ml-auto" />
        </div>
      </SidebarHeader>

      <SidebarContent className="px-3 py-4 flex-1 overflow-auto">
        <SidebarGroup>
          <SidebarGroupLabel className="px-2 text-xs font-semibold" style={{ color: 'hsl(var(--color-muted-foreground))' }}>
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent className="mt-2">
            <SidebarMenu>
              {menuItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link
                        href={item.href}
                        className={cn(
                          "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                          isActive
                            ? "shadow-sm"
                            : "hover:shadow-sm hover:bg-primary/10"
                        )}
                        style={isActive ? {
                          backgroundColor: 'hsl(var(--color-primary))',
                          color: 'white'
                        } : undefined}
                      >
                        <item.icon className="h-4 w-4" />
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

      <SidebarFooter className="border-t p-3 flex-shrink-0" style={{ borderColor: 'hsl(var(--color-border))' }}>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="w-full rounded-lg px-3 py-2 hover:shadow-sm" style={{
                  backgroundColor: 'hsl(var(--color-muted) / 0.5)'
                }}>
                  <Avatar className="h-7 w-7 border-2" style={{ borderColor: 'hsl(var(--color-primary))' }}>
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback style={{
                      backgroundColor: 'hsl(var(--color-primary) / 0.1)',
                      color: 'hsl(var(--color-primary))'
                    }}>
                      <UserCircle className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <span className="truncate font-medium" style={{ color: 'hsl(var(--color-foreground))' }}>
                    Admin User
                  </span>
                  <ChevronUp className="ml-auto h-4 w-4" style={{ color: 'hsl(var(--color-muted-foreground))' }} />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem asChild>
                  <Link href="/admin/profile" className="cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer" style={{ color: 'hsl(var(--color-destructive))' }}>
                  <Link href="/login">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign out
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

export interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <SidebarProvider
      defaultOpen={true}
      style={{
        "--sidebar-width": "14rem",
      } as React.CSSProperties}
    >
      <AppSidebar />
      <SidebarInset>
        <main className="flex-1 p-4 md:p-6" style={{
          backgroundColor: 'hsl(var(--color-muted) / 0.3)'
        }}>
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};
