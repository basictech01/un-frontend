"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { LoginForm } from "@/features/auth/ui/organisms/LoginForm";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { UserRole } from "@/types/enums";

export default function LoginPage() {
  const { isAuthenticated, user, isLoading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (authLoading) return;
    if (isAuthenticated && user) {
      if (user.role === UserRole.ADMIN) router.push("/admin");
      else if (user.role === UserRole.AUTHOR) router.push("/author");
    }
  }, [isAuthenticated, user, authLoading, router]);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-blue-100 p-4 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(10,91,211,0.05),rgba(255,255,255,0))]" />

      {/* Animated gradient orbs */}
      <div className="absolute left-1/4 top-1/4 h-96 w-96 animate-pulse rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 h-96 w-96 animate-pulse rounded-full bg-gradient-to-r from-secondary/10 to-primary/10 blur-3xl animation-delay-2000" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-md">
        {/* Page Title */}
        <div className="mb-8 text-center">
          <h1 className="mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-3xl font-bold text-transparent">
            Editorial Management
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Admin & Author Dashboard
          </p>
        </div>

        <LoginForm />

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-slate-500 dark:text-slate-400">
          Powered by Uttrakhand News Platform
        </p>
      </div>
    </div>
  );
}
