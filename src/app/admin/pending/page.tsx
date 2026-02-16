"use client";

import { Button } from "@/ui/button";
import { Clock } from "lucide-react";
import { ArticlesTable } from "@/features/article/ui/organisms/ArticlesTable";
import { usePendingArticles } from "@/features/article/hooks/usePendingArticles";

export default function PendingArticlesPage() {
  const { articles, loading, totalCount, hasNextPage, loadMore } =
    usePendingArticles();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Clock className="h-6 w-6" style={{ color: 'hsl(var(--color-primary))' }} />
            <h1 className="text-3xl font-bold tracking-tight" style={{ color: 'hsl(var(--color-foreground))' }}>
              Pending Articles
            </h1>
          </div>
          <p className="mt-1 text-sm" style={{ color: 'hsl(var(--color-muted-foreground))' }}>
            Review and approve articles waiting for publication · Total:{" "}
            {totalCount} articles
          </p>
        </div>
      </div>

      {totalCount === 0 && !loading ? (
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-md border border-dashed">
          <Clock className="mb-4 h-12 w-12" style={{ color: 'hsl(var(--color-muted-foreground) / 0.5)' }} />
          <h3 className="mb-2 text-lg font-semibold">No Pending Articles</h3>
          <p className="text-sm" style={{ color: 'hsl(var(--color-muted-foreground))' }}>
            All articles have been reviewed. Great job!
          </p>
        </div>
      ) : (
        <>
          <ArticlesTable
            articles={articles}
            loading={loading}
            showBulkActions
          />

          {hasNextPage && (
            <div className="flex justify-center">
              <Button
                variant="outline"
                onClick={loadMore}
                className="shadow-sm hover:shadow-md"
              >
                Load More Articles
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
