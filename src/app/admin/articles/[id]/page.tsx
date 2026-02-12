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
import { formatDate } from "@/lib/utils";

export default function ArticleDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const articleId = parseInt(id, 10);
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
      <div
        className="rounded-lg border p-6 shadow-sm"
        style={{
          borderColor: 'hsl(var(--color-primary) / 0.2)',
          background: 'linear-gradient(135deg, hsl(var(--color-primary) / 0.05) 0%, hsl(var(--color-primary) / 0.1) 50%, hsl(var(--color-secondary) / 0.05) 100%)'
        }}
      >
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            asChild
            className="rounded-full"
            style={{
              backgroundColor: 'hsl(var(--color-card))',
              color: 'hsl(var(--color-primary))'
            }}
          >
            <Link href="/admin">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold" style={{ color: 'hsl(var(--color-foreground))' }}>
              Article Detail
            </h1>
            <p className="text-sm" style={{ color: 'hsl(var(--color-muted-foreground))' }}>
              Review and manage article content
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              asChild
              variant="outline"
              size="sm"
              style={{
                borderColor: 'hsl(var(--color-primary) / 0.3)',
                color: 'hsl(var(--color-primary))',
                backgroundColor: 'hsl(var(--color-card))'
              }}
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
                  className="shadow-sm"
                  style={{
                    backgroundColor: 'hsl(var(--color-secondary))',
                    color: 'white'
                  }}
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
            <Card
              className="shadow-sm"
              style={{
                borderColor: 'hsl(var(--color-primary) / 0.2)'
              }}
            >
              <CardHeader
                className="border-b"
                style={{
                  borderColor: 'hsl(var(--color-border))',
                  background: 'linear-gradient(135deg, hsl(var(--color-primary) / 0.05) 0%, hsl(var(--color-primary) / 0.08) 100%)'
                }}
              >
                <CardTitle className="text-sm font-semibold" style={{ color: 'hsl(var(--color-primary))' }}>
                  Author
                </CardTitle>
              </CardHeader>
              <CardContent className="flex items-center gap-3 pt-4">
                <Avatar className="h-12 w-12 border-2" style={{ borderColor: 'hsl(var(--color-primary) / 0.2)' }}>
                  <AvatarImage
                    src={article.author.profile_photo ?? undefined}
                  />
                  <AvatarFallback style={{
                    backgroundColor: 'hsl(var(--color-primary) / 0.1)',
                    color: 'hsl(var(--color-primary))'
                  }}>
                    {article.author.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()
                      .slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold" style={{ color: 'hsl(var(--color-foreground))' }}>
                    {article.author.name}
                  </p>
                  <p className="text-xs" style={{ color: 'hsl(var(--color-muted-foreground))' }}>
                    {article.author.email}
                  </p>
                  {article.author.profession && (
                    <p className="text-xs" style={{ color: 'hsl(var(--color-muted-foreground))' }}>
                      {article.author.profession}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          <Card
            className="shadow-sm"
            style={{
              borderColor: 'hsl(var(--color-secondary) / 0.2)'
            }}
          >
            <CardHeader
              className="border-b"
              style={{
                borderColor: 'hsl(var(--color-border))',
                background: 'linear-gradient(135deg, hsl(var(--color-secondary) / 0.05) 0%, hsl(var(--color-secondary) / 0.08) 100%)'
              }}
            >
              <CardTitle className="text-sm font-semibold" style={{ color: 'hsl(var(--color-secondary))' }}>
                Timeline
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 pt-4 text-sm">
              <div className="flex items-center justify-between rounded-md p-2" style={{ backgroundColor: 'hsl(var(--color-muted) / 0.3)' }}>
                <span style={{ color: 'hsl(var(--color-muted-foreground))' }}>Created</span>
                <span className="font-medium" style={{ color: 'hsl(var(--color-foreground))' }}>
                  {formatDate(article.created_at)}
                </span>
              </div>
              <div className="flex items-center justify-between rounded-md p-2" style={{ backgroundColor: 'hsl(var(--color-muted) / 0.3)' }}>
                <span style={{ color: 'hsl(var(--color-muted-foreground))' }}>Updated</span>
                <span className="font-medium" style={{ color: 'hsl(var(--color-foreground))' }}>
                  {formatDate(article.updated_at)}
                </span>
              </div>
              {article.published_at && (
                <div className="flex items-center justify-between rounded-md p-2" style={{ backgroundColor: 'hsl(var(--color-secondary) / 0.1)' }}>
                  <span style={{ color: 'hsl(var(--color-muted-foreground))' }}>Published</span>
                  <span className="font-medium" style={{ color: 'hsl(var(--color-secondary))' }}>
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
