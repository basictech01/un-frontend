import { Badge } from "@/ui/badge";
import { cn } from "@/lib/utils";
import { UserRole, UserRoleLabels } from "@/types/enums";

const roleStyles: Record<UserRole, { bg: string; text: string; border: string }> = {
  [UserRole.ADMIN]: {
    bg: 'hsl(var(--color-primary) / 0.15)',
    text: 'hsl(var(--color-primary))',
    border: 'hsl(var(--color-primary) / 0.3)'
  },
  [UserRole.AUTHOR]: {
    bg: 'hsl(var(--color-secondary) / 0.15)',
    text: 'hsl(var(--color-secondary))',
    border: 'hsl(var(--color-secondary) / 0.3)'
  },
};

interface RoleBadgeProps {
  role: UserRole;
  className?: string;
}

export function RoleBadge({ role, className }: RoleBadgeProps) {
  // Handle undefined or invalid roles
  if (!role) {
    return (
      <Badge variant="outline" className={cn("font-medium shadow-sm", className)}>
        —
      </Badge>
    );
  }

  const styles = roleStyles[role] ?? roleStyles[UserRole.AUTHOR];
  const label = UserRoleLabels[role] ?? role;

  return (
    <Badge
      variant="outline"
      className={cn("font-medium shadow-sm", className)}
      style={{
        backgroundColor: styles.bg,
        color: styles.text,
        borderColor: styles.border
      }}
    >
      {label}
    </Badge>
  );
}
