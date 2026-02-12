import { Badge } from "@/ui/badge";
import { cn } from "@/lib/utils";

const roleStyles: Record<string, { bg: string; text: string; border: string }> = {
  ADMIN: {
    bg: 'hsl(var(--color-primary) / 0.15)',
    text: 'hsl(var(--color-primary))',
    border: 'hsl(var(--color-primary) / 0.3)'
  },
  AUTHOR: {
    bg: 'hsl(var(--color-secondary) / 0.15)',
    text: 'hsl(var(--color-secondary))',
    border: 'hsl(var(--color-secondary) / 0.3)'
  },
  USER: {
    bg: 'hsl(220 13% 95%)',
    text: 'hsl(220 9% 46%)',
    border: 'hsl(220 13% 85%)'
  },
};

const roleLabels: Record<string, string> = {
  ADMIN: "Admin",
  AUTHOR: "Author",
  USER: "User",
};

interface RoleBadgeProps {
  role: string;
  className?: string;
}

export function RoleBadge({ role, className }: RoleBadgeProps) {
  const styles = roleStyles[role] ?? roleStyles.USER;

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
      {roleLabels[role] ?? role}
    </Badge>
  );
}
