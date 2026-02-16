"use client";

import Link from "next/link";
import { Button } from "@/ui/button";
import { Users, Plus } from "lucide-react";
import { UserFilterBar } from "@/features/user/ui/molecules/UserFilterBar";
import { UsersTable } from "@/features/user/ui/organisms/UsersTable";
import { useUsers } from "@/features/user/hooks/useUsers";
import { useUserFilter } from "@/features/user/hooks/useUserFilter";
import { useDebounce } from "@/hooks/useDebounce";
import { PageHeader } from "@/components/molecules/PageHeader";

export default function UsersPage() {
  const { filter, setSearch, setRole, setStatus, resetFilters } =
    useUserFilter();
  const debouncedSearch = useDebounce(filter.search, 300);

  const { users, loading, totalCount, hasNextPage, loadMore } = useUsers({
    ...filter,
    search: debouncedSearch,
  });

  return (
    <div className="space-y-6">
      <PageHeader
        icon={Users}
        title="Users Management"
        subtitle={`Manage users, roles, and permissions · Total: ${totalCount} users`}
        colorScheme="secondary"
        showIconBadge
        actionButton={
          <Button
            asChild
            size="lg"
            className="btn-secondary-action shadow-md transition-all hover:shadow-lg"
          >
            <Link href="/admin/users/create">
              <Plus className="mr-2 h-5 w-5" />
              Create New User
            </Link>
          </Button>
        }
      />

      <UserFilterBar
        search={filter.search}
        role={filter.role}
        isActive={filter.isActive}
        onSearchChange={setSearch}
        onRoleChange={setRole}
        onStatusChange={setStatus}
        onReset={resetFilters}
      />

      <UsersTable users={users} loading={loading} />

      {hasNextPage && (
        <div className="flex justify-center">
          <Button
            variant="outline"
            onClick={loadMore}
            className="border-secondary-light text-secondary shadow-sm hover:shadow-md"
          >
            Load More Users
          </Button>
        </div>
      )}
    </div>
  );
}
