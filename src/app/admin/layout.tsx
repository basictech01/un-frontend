"use client";

import { AuthGuard } from "@/features/auth/ui/organisms/AuthGuard";
import { AdminDashboardLayout as DashboardLayout } from "@/features/auth/ui/templates/AdminDashboardLayout";
import { UserRole } from "@/types/enums";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard requiredRole={UserRole.ADMIN}>
      <DashboardLayout>{children}</DashboardLayout>
    </AuthGuard>
  );
}
