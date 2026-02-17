"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../hooks/useAuth";
import { UserRole } from "@/types/enums";
import { FullScreenLoader } from "@/components/organisms";

interface AuthGuardProps {
  children: ReactNode;
  requiredRole?: UserRole;
}

function getDashboardForRole(role: string): string {
  const normalized = role.toUpperCase();
  if (normalized === UserRole.ADMIN) return "/admin";
  if (normalized === UserRole.AUTHOR) return "/author";
  // TODO: When the public website is built, unauthenticated users will land
  // on the home page instead of being redirected to /login.
  return "/admin";
}

export function AuthGuard({ children, requiredRole }: AuthGuardProps) {
  const { user, isLoading, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated) {
      // TODO: In future, unauthenticated users will see the public website
      // home page here instead of being redirected to /login.
      router.replace("/login");
      return;
    }

    if (requiredRole && user?.role) {
      const normalizedUserRole = user.role.toUpperCase();
      const normalizedRequiredRole = requiredRole.toUpperCase();

      if (normalizedUserRole !== normalizedRequiredRole) {
        // Redirect to the user's correct dashboard instead of login
        router.replace(getDashboardForRole(normalizedUserRole));
      }
    }
  }, [isLoading, isAuthenticated, user, requiredRole, router]);

  if (isLoading) {
    return <FullScreenLoader message="Verifying your credentials..." />;
  }

  if (!isAuthenticated) return null;

  if (requiredRole && user?.role) {
    const normalizedUserRole = user.role.toUpperCase();
    const normalizedRequiredRole = requiredRole.toUpperCase();
    if (normalizedUserRole !== normalizedRequiredRole) return null;
  }

  return <>{children}</>;
}
