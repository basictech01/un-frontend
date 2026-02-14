import { Badge } from "@/ui/badge";
import { ArticleStatus } from "@/types/enums";
import { cn } from "@/lib/utils";

const statusStyles: Record<string, { bg: string; text: string; border: string }> = {
  [ArticleStatus.DRAFT]: {
    bg: "hsl(220 13% 95%)",
    text: "hsl(220 9% 46%)",
    border: "hsl(220 13% 85%)"
  },
  [ArticleStatus.PENDING]: {
    bg: "hsl(48 96% 95%)",
    text: "hsl(43 96% 40%)",
    border: "hsl(48 96% 80%)"
  },
  [ArticleStatus.APPROVED]: {
    bg: "hsl(var(--color-secondary) / 0.15)",
    text: "hsl(var(--color-secondary))",
    border: "hsl(var(--color-secondary) / 0.3)"
  },
  [ArticleStatus.REJECTED]: {
    bg: "hsl(var(--color-destructive) / 0.15)",
    text: "hsl(var(--color-destructive))",
    border: "hsl(var(--color-destructive) / 0.3)"
  },
};

const statusLabels: Record<string, string> = {
  [ArticleStatus.DRAFT]: "Draft",
  [ArticleStatus.PENDING]: "Pending",
  [ArticleStatus.APPROVED]: "Approved",
  [ArticleStatus.REJECTED]: "Rejected",
};

interface StatusBadgeProps {
  status: string;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  // Convert to uppercase to match enum values
  const normalizedStatus = status?.toUpperCase();
  const styles = statusStyles[normalizedStatus];

  return (
    <Badge
      variant="outline"
      className={cn("font-medium shadow-sm", className)}
      style={styles ? {
        backgroundColor: styles.bg,
        color: styles.text,
        borderColor: styles.border
      } : undefined}
    >
      {statusLabels[normalizedStatus] ?? status}
    </Badge>
  );
}
