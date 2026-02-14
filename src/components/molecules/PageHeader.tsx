"use client";

import { type LucideIcon } from "lucide-react";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  actionButton?: ReactNode;
  colorScheme?: 'primary' | 'secondary';
  showIconBadge?: boolean;
}

export function PageHeader({
  icon: Icon,
  title,
  subtitle,
  actionButton,
  colorScheme = 'primary',
  showIconBadge = false,
}: PageHeaderProps) {

  const isPrimary = colorScheme === 'primary';

  return (
    <div
      className={cn(
        "rounded-lg border p-6 shadow-sm",
        isPrimary ? "border-primary/20 bg-gradient-primary-soft" : "border-secondary/20 bg-gradient-secondary-soft"
      )}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          {showIconBadge ? (
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "rounded-lg p-2",
                  isPrimary ? "bg-primary/10" : "bg-secondary/10"
                )}
              >
                <Icon className={cn(
                  "h-6 w-6",
                  isPrimary ? "text-primary" : "text-secondary"
                )} />
              </div>
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-foreground">
                  {title}
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                  {subtitle}
                </p>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-2">
                <Icon className={cn(
                  "h-6 w-6",
                  isPrimary ? "text-primary" : "text-secondary"
                )} />
                <h1 className="text-3xl font-bold tracking-tight text-foreground">
                  {title}
                </h1>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                {subtitle}
              </p>
            </div>
          )}
        </div>

        {actionButton && (
          <div className="flex-shrink-0">
            {actionButton}
          </div>
        )}
      </div>
    </div>
  );
}
