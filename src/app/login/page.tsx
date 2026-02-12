"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { LoginForm } from "@/features/auth/ui/molecules/LoginForm";
import { useLogin } from "@/features/auth/hooks/useLogin";
import { useAuth } from "@/features/auth/hooks/useAuth";

export default function LoginPage() {
  const { handleLogin, isLoading } = useLogin();
  const { isAuthenticated, user, isLoading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (authLoading) return;
    if (isAuthenticated && user) {
      if (user.role === "admin") router.push("/admin");
      else if (user.role === "author") router.push("/author");
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
        {/* Logo/Brand */}
        <div className="mb-8 text-center">
          <div className="mb-6 inline-flex items-center justify-center">
            <Image
              src="/logo/image.png"
              alt="Uttrakhand News"
              width={180}
              height={60}
              className="h-auto w-auto max-w-[180px]"
              priority
            />
          </div>
          <h1 className="mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-3xl font-bold text-transparent">
            Editorial Management
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Admin & Author Dashboard
          </p>
        </div>

        <LoginForm onSubmit={handleLogin} isLoading={isLoading} />

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-slate-500 dark:text-slate-400">
          Powered by Uttrakhand News Platform
        </p>
      </div>
    </div>
  );
}
