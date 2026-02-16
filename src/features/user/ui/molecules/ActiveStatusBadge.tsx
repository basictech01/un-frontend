import { Badge } from "@/ui/badge";
import { cn } from "@/lib/utils";

interface ActiveStatusBadgeProps {
  isActive: boolean;
  className?: string;
}

export function ActiveStatusBadge({
  isActive,
  className,
}: ActiveStatusBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={cn(
        isActive
          ? "bg-green-50 text-green-700 border-green-200"
          : "bg-red-50 text-red-700 border-red-200",
        className
      )}
    >
      {isActive ? "Active" : "Inactive"}
    </Badge>
  );
}
