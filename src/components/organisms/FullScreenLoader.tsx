import { UNLoader } from "./UNLoader";

interface FullScreenLoaderProps {
  message?: string;
}

export function FullScreenLoader({ message }: FullScreenLoaderProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(10,91,211,0.05),rgba(255,255,255,0))]" />

      {/* Animated gradient orbs */}
      <div className="absolute left-1/4 top-1/4 h-96 w-96 animate-pulse rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 h-96 w-96 animate-pulse rounded-full bg-gradient-to-r from-secondary/10 to-primary/10 blur-3xl animation-delay-2000" />

      {/* Loader content */}
      <div className="relative z-10 flex flex-col items-center">
        <UNLoader />

        {message && (
          <p className="mt-6 text-sm text-muted-foreground animate-pulse">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
