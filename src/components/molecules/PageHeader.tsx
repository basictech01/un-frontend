"use client";

import { Button } from "@/ui/button";
import { Menu, type LucideIcon } from "lucide-react";
import { useSidebar } from "@/ui/sidebar";
import { ReactNode } from "react";

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
  const { toggleSidebar } = useSidebar();

  const colorVar = colorScheme === 'primary'
    ? 'var(--color-primary)'
    : 'var(--color-secondary)';

  const gradientBg = colorScheme === 'primary'
    ? 'linear-gradient(135deg, hsl(var(--color-primary) / 0.05) 0%, hsl(var(--color-primary) / 0.1) 50%, hsl(var(--color-secondary) / 0.05) 100%)'
    : 'linear-gradient(135deg, hsl(var(--color-secondary) / 0.05) 0%, hsl(var(--color-secondary) / 0.1) 50%, hsl(var(--color-primary) / 0.05) 100%)';

  return (
    <div
      className="rounded-lg border p-6 shadow-sm"
      style={{
        borderColor: `hsl(${colorVar} / 0.2)`,
        background: gradientBg
      }}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="md:hidden"
            style={{ color: `hsl(${colorVar})` }}
          >
            <Menu className="h-5 w-5" />
          </Button>

          {showIconBadge ? (
            <div className="flex items-center gap-3">
              <div
                className="rounded-lg p-2"
                style={{
                  backgroundColor: `hsl(${colorVar} / 0.1)`
                }}
              >
                <Icon className="h-6 w-6" style={{ color: `hsl(${colorVar})` }} />
              </div>
              <div>
                <h1 className="text-3xl font-bold tracking-tight" style={{ color: 'hsl(var(--color-foreground))' }}>
                  {title}
                </h1>
                <p className="mt-1 text-sm" style={{ color: 'hsl(var(--color-muted-foreground))' }}>
                  {subtitle}
                </p>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-2">
                <Icon className="h-6 w-6" style={{ color: `hsl(${colorVar})` }} />
                <h1 className="text-3xl font-bold tracking-tight" style={{ color: 'hsl(var(--color-foreground))' }}>
                  {title}
                </h1>
              </div>
              <p className="mt-2 text-sm" style={{ color: 'hsl(var(--color-muted-foreground))' }}>
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
