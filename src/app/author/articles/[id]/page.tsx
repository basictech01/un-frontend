"use client";

import { use } from "react";
import Link from "next/link";
import { Button } from "@/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import { Skeleton } from "@/ui/skeleton";
import { ArrowLeft, Pencil } from "lucide-react";
import { ArticleDetailHeader } from "@/features/article/ui/molecules/ArticleDetailHeader";
import { ArticleDetailContent } from "@/features/article/ui/molecules/ArticleDetailContent";
import { RejectionFeedbackCard } from "@/features/article/ui/molecules/RejectionFeedbackCard";
import { StatusBadge } from "@/features/article/ui/molecules/StatusBadge";
import { useArticle } from "@/features/article/hooks/useArticle";
import { ArticleStatus } from "@/types/enums";
import { formatDate } from "@/lib/utils";

export default function AuthorArticleDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const articleId = parseInt(id, 10) || -1;
  const { article, loading } = useArticle(articleId);

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-64 w-full" />
        <Skeleton className="h-32 w-full" />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-muted-foreground">Article not found</p>
      </div>
    );
  }

  const canEdit =
    article.status === ArticleStatus.DRAFT ||
    article.status === ArticleStatus.REJECTED;

  return (
    <div className="space-y-6">
      {/* Header with gradient background */}
      <div className="border-primary-subtle rounded-lg border p-6 shadow-sm bg-gradient-primary-soft">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            asChild
            className="rounded-full bg-card text-primary"
          >
            <Link href="/author/articles">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-foreground">
              Article Detail
            </h1>
            <p className="text-sm text-muted-foreground">
              View your article content and status
            </p>
          </div>
          <div className="flex items-center gap-3">
            <StatusBadge status={article.status} />
            {canEdit && (
              <Button
                asChild
                variant="outline"
                size="sm"
                className="border-primary-light bg-card text-primary"
              >
                <Link href={`/author/articles/${article.id}/edit`}>
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit Article
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Rejection Feedback - Show prominently if rejected */}
      {article.status === ArticleStatus.REJECTED && article.rejection_reason && (
        <RejectionFeedbackCard
          reason={article.rejection_reason}
          rejectedAt={article.updated_at}
        />
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <ArticleDetailHeader article={article} />
          <ArticleDetailContent content={article.content} />
        </div>

        <aside className="space-y-4">
          <Card className="border-secondary-subtle shadow-sm">
            <CardHeader className="border-b card-header-secondary">
              <CardTitle className="text-sm font-semibold text-secondary">
                Timeline
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 pt-4 text-sm">
              <div className="flex items-center justify-between rounded-md bg-muted-light p-2">
                <span className="text-muted-foreground">Created</span>
                <span className="font-medium text-foreground">
                  {formatDate(article.created_at)}
                </span>
              </div>
              <div className="flex items-center justify-between rounded-md bg-muted-light p-2">
                <span className="text-muted-foreground">Updated</span>
                <span className="font-medium text-foreground">
                  {formatDate(article.updated_at)}
                </span>
              </div>
              {article.published_at && (
                <div className="flex items-center justify-between rounded-md bg-secondary-very-light p-2">
                  <span className="text-muted-foreground">Published</span>
                  <span className="font-medium text-secondary">
                    {formatDate(article.published_at)}
                  </span>
                </div>
              )}
            </CardContent>
          </Card>

          {article.status === ArticleStatus.PENDING && (
            <Card className="border-warning/30 shadow-sm bg-warning/5">
              <CardHeader>
                <CardTitle className="text-sm font-semibold text-warning">
                  Under Review
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Your article is currently being reviewed by the admin. You'll be notified once a decision is made.
              </CardContent>
            </Card>
          )}

          {article.status === ArticleStatus.APPROVED && (
            <Card className="border-secondary-subtle shadow-sm bg-secondary/5">
              <CardHeader>
                <CardTitle className="text-sm font-semibold text-secondary">
                  Published
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Congratulations! Your article has been approved and is now live.
              </CardContent>
            </Card>
          )}
        </aside>
      </div>
    </div>
  );
}
