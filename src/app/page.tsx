"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { UserRole } from "@/types/enums";
import { UNLoader } from "@/components/organisms/UNLoader";

export default function HomePage() {
  const { isAuthenticated, user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    // Authenticated users go to their dashboard
    if (isAuthenticated && user?.role) {
      const role = user.role.toUpperCase();
      if (role === UserRole.ADMIN) {
        router.replace("/admin");
      } else if (role === UserRole.AUTHOR) {
        router.replace("/author");
      } else {
        router.replace("/admin");
      }
    }
    // Unauthenticated users stay on this page (public home)
  }, [isAuthenticated, user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-muted/30">
        <UNLoader />
      </div>
    );
  }

  // Authenticated users will be redirected — show loader while navigating
  if (isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-muted/30">
        <UNLoader />
      </div>
    );
  }

  // TODO: Replace this placeholder with the full public website home page
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/30 gap-6">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="relative h-16 w-16">
          <Image
            src="/logo/image.png"
            alt="Uttrakhand Next"
            fill
            sizes="64px"
            className="object-contain"
          />
        </div>
        <h1 className="text-4xl font-bold text-primary">Uttrakhand Next</h1>
        <p className="text-muted-foreground text-lg">
          Coming soon — the home page is under construction.
        </p>
      </div>
    </div>
  );
}
