"use client";

import Link from "next/link";
import { Button } from "@/ui/button";
import { Plus, FileText } from "lucide-react";
import { ArticleFilterBar } from "@/features/article/ui/molecules/ArticleFilterBar";
import { ArticlesTable } from "@/features/article/ui/organisms/ArticlesTable";
import { useArticles } from "@/features/article/hooks/useArticles";
import { useArticleFilter } from "@/features/article/hooks/useArticleFilter";
import { useDebounce } from "@/hooks/useDebounce";
import { PageHeader } from "@/components/molecules/PageHeader";
import type { ArticleStatus } from "@/types/enums";

export default function AllArticlesPage() {
  const { filter, setSearch, setStatus, setSection, resetFilters } =
    useArticleFilter();
  const debouncedSearch = useDebounce(filter.search, 300);

  const { articles, loading, totalCount, hasNextPage, loadMore } =
    useArticles({ ...filter, search: debouncedSearch });

  return (
    <div className="space-y-6">
      <PageHeader
        icon={FileText}
        title="Articles Management"
        subtitle={`Create, manage, and publish articles · Total: ${totalCount} articles`}
        colorScheme="primary"
        actionButton={
          <Button
            asChild
            size="lg"
            className="btn-primary-action shadow-md transition-all hover:shadow-lg"
          >
            <Link href="/admin/articles/create">
              <Plus className="mr-2 h-5 w-5" />
              Create New Article
            </Link>
          </Button>
        }
      />

      <ArticleFilterBar
        search={filter.search}
        status={filter.status}
        section={filter.section}
        onSearchChange={setSearch}
        onStatusChange={(v) =>
          setStatus(v === "all" ? ("" as ArticleStatus | "") : (v as ArticleStatus))
        }
        onSectionChange={(v) => setSection(v === "all" ? "" : v)}
        onReset={resetFilters}
      />

      <ArticlesTable articles={articles} loading={loading} showBulkActions />

      {hasNextPage && (
        <div className="flex justify-center">
          <Button
            variant="outline"
            onClick={loadMore}
            className="border-primary-light text-primary shadow-sm hover:shadow-md"
          >
            Load More Articles
          </Button>
        </div>
      )}
    </div>
  );
}
