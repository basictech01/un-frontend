"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { UserRole } from "@/types/enums";
import { UNLoader } from "@/components/organisms/UNLoader";

export default function HomePage() {
  const { isAuthenticated, user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    // If authenticated, redirect to appropriate dashboard
    if (isAuthenticated && user) {
      const normalizedRole = user.role?.toUpperCase();
      if (normalizedRole === "ADMIN" || normalizedRole === UserRole.ADMIN) {
        router.replace("/admin");
      } else if (normalizedRole === "AUTHOR" || normalizedRole === UserRole.AUTHOR) {
        router.replace("/author");
      } else {
        // Unknown role, default to admin
        router.replace("/admin");
      }
    } else {
      // Not authenticated, redirect to login
      router.replace("/login");
    }
  }, [isAuthenticated, user, isLoading, router]);

  // Show loading state while redirecting
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30">
      <UNLoader />
    </div>
  );
}
