"use client";

import { AuthGuard } from "@/features/auth/ui/organisms/AuthGuard";
import { AdminDashboardLayout as DashboardLayout } from "@/features/auth/ui/templates/AdminDashboardLayout";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard requiredRole="admin">
      <DashboardLayout>{children}</DashboardLayout>
    </AuthGuard>
  );
}
