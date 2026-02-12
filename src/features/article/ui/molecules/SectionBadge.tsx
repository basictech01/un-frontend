import { Badge } from "@/ui/badge";
import { formatSectionLabel } from "@/lib/utils";

interface SectionBadgeProps {
  section: string;
  className?: string;
}

export function SectionBadge({ section, className }: SectionBadgeProps) {
  return (
    <Badge
      variant="secondary"
      className={className}
      style={{
        backgroundColor: 'hsl(var(--color-primary) / 0.1)',
        color: 'hsl(var(--color-primary))',
        borderColor: 'hsl(var(--color-primary) / 0.2)',
        fontWeight: '500'
      }}
    >
      {formatSectionLabel(section)}
    </Badge>
  );
}
