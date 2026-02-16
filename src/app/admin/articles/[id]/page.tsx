"use client";

import { use, useState } from "react";
import Link from "next/link";
import { Button } from "@/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/ui/avatar";
import { Skeleton } from "@/ui/skeleton";
import { ArrowLeft, CheckCircle, XCircle, Pencil } from "lucide-react";
import { ArticleDetailHeader } from "@/features/article/ui/molecules/ArticleDetailHeader";
import { ArticleDetailContent } from "@/features/article/ui/molecules/ArticleDetailContent";
import { useArticle } from "@/features/article/hooks/useArticle";
import { useArticleActions } from "@/features/article/hooks/useArticleActions";
import { ArticleRejectionDialog } from "@/features/article/ui/molecules/ArticleRejectionDialog";
import { ArticleStatus } from "@/types/enums";
import { formatDate, getInitials } from "@/lib/utils";

export default function ArticleDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  // Use -1 as sentinel value for invalid IDs to prevent showing wrong article
  const articleId = parseInt(id, 10) || -1;
  const { article, loading } = useArticle(articleId);
  const { handleApprove, handleReject, isApproving, isRejecting } =
    useArticleActions();
  const [rejectOpen, setRejectOpen] = useState(false);

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
            <Link href="/admin">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-foreground">
              Article Detail
            </h1>
            <p className="text-sm text-muted-foreground">
              Review and manage article content
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              asChild
              variant="outline"
              size="sm"
              className="border-primary-light bg-card text-primary"
            >
              <Link href={`/admin/articles/${article.id}/edit`}>
                <Pencil className="mr-2 h-4 w-4" />
                Edit Article
              </Link>
            </Button>
            {article.status === ArticleStatus.PENDING && (
              <>
                <Button
                  size="sm"
                  onClick={() => handleApprove(article.id)}
                  disabled={isApproving}
                  className="bg-secondary text-secondary-foreground shadow-sm"
                >
                  <CheckCircle className="mr-1 h-4 w-4" />
                  Approve
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => setRejectOpen(true)}
                  disabled={isRejecting}
                  className="shadow-sm"
                >
                  <XCircle className="mr-1 h-4 w-4" />
                  Reject
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <ArticleDetailHeader article={article} />
          <ArticleDetailContent content={article.content} />
        </div>

        <aside className="space-y-4">
          {article.author && (
            <Card className="border-primary-subtle shadow-sm">
              <CardHeader className="border-b card-header-primary">
                <CardTitle className="text-sm font-semibold text-primary">
                  Author
                </CardTitle>
              </CardHeader>
              <CardContent className="flex items-center gap-3 pt-4">
                <Avatar className="border-primary-subtle h-12 w-12 border-2">
                  <AvatarImage
                    src={article.author.profile_photo ?? undefined}
                  />
                  <AvatarFallback className="bg-primary-ultra-light text-primary">
                    {getInitials(article.author.name)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-foreground">
                    {article.author.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {article.author.email}
                  </p>
                  {article.author.profession && (
                    <p className="text-xs text-muted-foreground">
                      {article.author.profession}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

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
        </aside>
      </div>

      <ArticleRejectionDialog
        open={rejectOpen}
        onOpenChange={setRejectOpen}
        onConfirm={(reason) => {
          handleReject(article.id, reason);
          setRejectOpen(false);
        }}
      />
    </div>
  );
}
