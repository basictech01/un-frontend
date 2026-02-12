"use client";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/ui/table";
import { Skeleton } from "@/ui/skeleton";
import { UserTableRow } from "../molecules/UserTableRow";
import { useToggleUserStatus } from "../../hooks/useToggleUserStatus";
import type { UserProfile } from "@/types/common";

interface UsersTableProps {
  users: UserProfile[];
  loading: boolean;
}

export function UsersTable({ users, loading }: UsersTableProps) {
  const { handleToggle, isLoading: isTogglingStatus } = useToggleUserStatus();

  if (loading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-16 w-full" />
        ))}
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="flex min-h-[200px] items-center justify-center rounded-md border border-dashed text-muted-foreground">
        No users found
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-md border shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="min-w-[250px]">User</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Profession</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Joined</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <UserTableRow
              key={user.id}
              user={user}
              onToggleStatus={handleToggle}
              isTogglingStatus={isTogglingStatus}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
