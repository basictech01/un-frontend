"use client";

import { AuthGuard } from "@/features/auth/ui/organisms/AuthGuard";
import { DashboardLayout } from "@/app/admin/components/DashboardLayout";

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
