import { Skeleton } from "@/ui/skeleton";
import type { LatestStoriesSidebarProps } from "@/types/public";
import { LatestStoryCard } from "./LatestStoryCard";

export function LatestStoriesSidebar({
  articles,
  loading,
}: LatestStoriesSidebarProps) {
  const latestArticles = articles.slice(0, 6);

  return (
    <aside className="flex flex-col h-full">
      <div className="mb-6">
        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">
          Latest Stories
        </h3>
      </div>

      {loading ? (
        <div className="space-y-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex gap-4">
              <Skeleton className="w-20 h-24 shrink-0 rounded-lg bg-slate-200" />
              <div className="flex-grow pt-1 space-y-2">
                <Skeleton className="h-4 w-full bg-slate-200" />
                <Skeleton className="h-4 w-4/5 bg-slate-200" />
                <Skeleton className="h-3 w-1/3 mt-3 bg-slate-200" />
              </div>
            </div>
          ))}
        </div>
      ) : latestArticles.length === 0 ? (
        <p className="text-sm text-slate-500">No stories yet.</p>
      ) : (
        <div className="space-y-6">
          {latestArticles.map((article) => (
            <LatestStoryCard key={article.id} article={article} />
          ))}
        </div>
      )}
    </aside>
  );
}
