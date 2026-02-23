import { TableCell, TableRow } from "@/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/ui/avatar";
import { Button } from "@/ui/button";
import { Badge } from "@/ui/badge";
import { Switch } from "@/ui/switch";
import { formatDate } from "@/lib/utils";
import { RoleBadge } from "./RoleBadge";
import type { UserProfile } from "@/types/common";

interface UserTableRowProps {
  user: UserProfile;
  onToggleStatus: (id: number, isActive: boolean) => void;
  isTogglingStatus: boolean;
}

export function UserTableRow({
  user,
  onToggleStatus,
  isTogglingStatus,
}: UserTableRowProps) {
  const initials = user.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2) || "U";

  return (
    <TableRow className="group transition-all hover:bg-secondary/8 hover:shadow-sm">
      <TableCell>
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 border-2 border-muted">
            <AvatarImage src={user.profile_photo || undefined} alt={user.name} />
            <AvatarFallback className="bg-primary/10 text-primary font-medium">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="font-medium text-foreground">{user.name}</p>
            <p className="text-xs text-muted-foreground truncate">{user.email}</p>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <RoleBadge role={user.role as import("@/types/enums").UserRole} />
      </TableCell>
      <TableCell>
        {user.profession ? (
          <span className="text-sm text-muted-foreground">{user.profession}</span>
        ) : (
          <span className="text-sm text-muted-foreground/50">—</span>
        )}
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <Switch
            checked={user.is_active}
            onCheckedChange={(checked) => onToggleStatus(user.id, checked)}
            disabled={isTogglingStatus}
          />
          <Badge
            variant="outline"
            className="font-medium shadow-sm"
            style={user.is_active ? {
              backgroundColor: 'hsl(var(--color-secondary) / 0.15)',
              color: 'hsl(var(--color-secondary))',
              borderColor: 'hsl(var(--color-secondary) / 0.3)'
            } : {
              backgroundColor: 'hsl(0 86% 97%)',
              color: 'hsl(0 84% 50%)',
              borderColor: 'hsl(0 86% 85%)'
            }}
          >
            {user.is_active ? "Active" : "Inactive"}
          </Badge>
        </div>
      </TableCell>
      <TableCell className="text-sm text-muted-foreground">
        {formatDate(user.created_at)}
      </TableCell>
    </TableRow>
  );
}
