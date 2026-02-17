"use client";

import { AuthGuard } from "@/features/auth/ui/organisms/AuthGuard";
import { AuthorDashboardLayout } from "@/features/auth/ui/templates/AuthorDashboardLayout";
import { UserRole } from "@/types/enums";

export default function AuthorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard requiredRole={UserRole.AUTHOR}>
      <AuthorDashboardLayout>{children}</AuthorDashboardLayout>
    </AuthGuard>
  );
}
