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

export function AuthGuard({ children, requiredRole }: AuthGuardProps) {
  const { user, isLoading, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    // Normalize role comparison (case-insensitive)
    if (requiredRole && user?.role) {
      const normalizedUserRole = user.role.toUpperCase();
      const normalizedRequiredRole = requiredRole.toUpperCase();

      if (normalizedUserRole !== normalizedRequiredRole) {
        router.push("/login");
      }
    }
  }, [isLoading, isAuthenticated, user, requiredRole, router]);

  if (isLoading) {
    return <FullScreenLoader message="Verifying your credentials..." />;
  }

  if (!isAuthenticated) return null;

  // Case-insensitive role check for rendering
  if (requiredRole && user?.role) {
    const normalizedUserRole = user.role.toUpperCase();
    const normalizedRequiredRole = requiredRole.toUpperCase();
    if (normalizedUserRole !== normalizedRequiredRole) return null;
  }

  return <>{children}</>;
}
