"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "../../hooks/useAuth";
import { Avatar, AvatarFallback, AvatarImage } from "@/ui/avatar";
import { Button } from "@/ui/button";
import { Separator } from "@/ui/separator";
import { ScrollArea } from "@/ui/scroll-area";
import {
  FileText,
  Clock,
  Users,
  UserCircle,
  LogOut,
  LayoutDashboard,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/articles", label: "All Articles", icon: FileText },
  { href: "/admin/pending", label: "Pending Review", icon: Clock },
  { href: "/admin/users", label: "Authors", icon: Users },
  { href: "/admin/profile", label: "My Profile", icon: UserCircle },
];

export function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "?";

  return (
    <div className="flex h-screen bg-muted/30">
      {/* Sidebar */}
      <aside className="hidden w-64 flex-col border-r bg-card lg:flex">
        {/* Logo Header */}
        <div className="flex h-20 flex-col justify-center border-b px-6 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative h-8 w-8">
              <Image
                src="/logo/image.png"
                alt="Logo"
                fill
                className="object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold text-primary">Uttrakhand Next</span>
              <span className="text-xs text-muted-foreground">Admin Panel</span>
            </div>
          </div>
        </div>

        <ScrollArea className="flex-1 px-3 py-4 overflow-y-auto">
          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive =
                item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                    isActive
                      ? "shadow-sm"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground"
                  )}
                  style={
                    isActive
                      ? {
                          backgroundColor: "hsl(var(--color-primary))",
                          color: "white",
                        }
                      : undefined
                  }
                >
                  <item.icon className="h-4 w-4 shrink-0" />
                  <span className="flex-1">{item.label}</span>
                  {isActive && (
                    <ChevronRight className="h-4 w-4 shrink-0 opacity-50" />
                  )}
                </Link>
              );
            })}
          </nav>
        </ScrollArea>

        <Separator className="flex-shrink-0" />

        {/* User Footer */}
        <div className="p-4 flex-shrink-0 bg-primary/5">
          <div className="flex items-center gap-3 rounded-lg border border-primary/20 bg-card p-3">
            <Avatar className="h-9 w-9 border-2 border-primary/30">
              <AvatarImage src={user?.profile_photo ?? undefined} />
              <AvatarFallback
                className="text-xs font-semibold"
                style={{
                  backgroundColor: "hsl(var(--color-primary))",
                  color: "white",
                }}
              >
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="truncate text-sm font-medium">{user?.name}</p>
              <p className="truncate text-xs text-muted-foreground">
                {user?.email}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 shrink-0 hover:bg-destructive/10 hover:text-destructive"
              onClick={logout}
              title="Logout"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </aside>

      {/* Mobile header */}
      <div className="flex flex-1 flex-col h-screen overflow-hidden">
        <header className="flex h-16 items-center justify-between border-b bg-card px-4 flex-shrink-0 lg:hidden">
          <div className="flex items-center gap-3">
            <div className="relative h-7 w-7">
              <Image
                src="/logo/image.png"
                alt="Logo"
                fill
                className="object-contain"
              />
            </div>
            <span className="text-sm font-semibold">Admin</span>
          </div>
          <nav className="flex items-center gap-1">
            {navItems.slice(0, 4).map((item) => {
              const isActive =
                item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-md p-2",
                    !isActive && "text-muted-foreground hover:bg-accent"
                  )}
                  style={
                    isActive
                      ? {
                          backgroundColor: "hsl(var(--color-primary))",
                          color: "white",
                        }
                      : undefined
                  }
                  title={item.label}
                >
                  <item.icon className="h-4 w-4" />
                </Link>
              );
            })}
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive"
              onClick={logout}
              title="Logout"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </nav>
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto">
          <div className="container mx-auto p-4 md:p-6 lg:p-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
