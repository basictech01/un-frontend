"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/ui/tabs";
import { Plus, FileText } from "lucide-react";
import { AuthorArticlesTable } from "@/features/article/ui/organisms/AuthorArticlesTable";
import { useMyArticles } from "@/features/article/hooks/useMyArticles";
import { PageHeader } from "@/components/molecules/PageHeader";
import { ArticleStatus } from "@/types/enums";

export default function AuthorArticlesPage() {
  const [statusFilter, setStatusFilter] = useState<string>("");
  const { articles, loading, totalCount, hasNextPage, loadMore } =
    useMyArticles({ status: statusFilter });

  return (
    <div className="space-y-6">
      <PageHeader
        icon={FileText}
        title="My Articles"
        subtitle={`Manage your articles and track their status · Total: ${totalCount} articles`}
        colorScheme="primary"
        actionButton={
          <Button
            asChild
            size="lg"
            className="btn-primary-action shadow-md transition-all hover:shadow-lg"
          >
            <Link href="/author/articles/create">
              <Plus className="mr-2 h-5 w-5" />
              Create New Article
            </Link>
          </Button>
        }
      />

      {/* Status Filter Tabs */}
      <Tabs
        value={statusFilter || "all"}
        onValueChange={(v) => setStatusFilter(v === "all" ? "" : v)}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-5 lg:w-auto">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value={ArticleStatus.DRAFT}>Drafts</TabsTrigger>
          <TabsTrigger value={ArticleStatus.PENDING}>Pending</TabsTrigger>
          <TabsTrigger value={ArticleStatus.APPROVED}>Approved</TabsTrigger>
          <TabsTrigger value={ArticleStatus.REJECTED}>Rejected</TabsTrigger>
        </TabsList>
      </Tabs>

      <AuthorArticlesTable articles={articles} loading={loading} />

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
