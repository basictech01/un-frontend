import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
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
        <SkeletonTheme baseColor="#e2e8f0" highlightColor="#f8fafc">
          <div className="space-y-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex gap-4">
                <Skeleton width={80} height={96} borderRadius={8} style={{ flexShrink: 0 }} />
                <div className="flex-grow pt-1 space-y-2">
                  <Skeleton height={16} />
                  <Skeleton width="80%" height={16} />
                  <Skeleton width="33%" height={12} />
                </div>
              </div>
            ))}
          </div>
        </SkeletonTheme>
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
