"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import { Button } from "@/ui/button";
import { ArrowLeft, Save, X, Send, RotateCcw, Trash2, Loader2 } from "lucide-react";
import { ArticleForm } from "@/features/article/ui/molecules/ArticleForm";
import { RejectionFeedbackCard } from "@/features/article/ui/molecules/RejectionFeedbackCard";
import { ArticleDeleteDialog } from "@/features/article/ui/molecules/ArticleDeleteDialog";
import { useArticle } from "@/features/article/hooks/useArticle";
import { useUpdateArticle } from "@/features/article/hooks/useUpdateArticle";
import { useSubmitArticle } from "@/features/article/hooks/useSubmitArticle";
import { useResubmitArticle } from "@/features/article/hooks/useResubmitArticle";
import { useDeleteArticle } from "@/features/article/hooks/useDeleteArticle";
import { Skeleton } from "@/ui/skeleton";
import { useState } from "react";
import Link from "next/link";
import { ArticleStatus } from "@/types/enums";

export default function AuthorEditArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const articleId = parseInt(id, 10);

  const { article, loading: articleLoading } = useArticle(articleId);
  const { formData, handleChange, handleSubmit, isLoading } = useUpdateArticle(article);
  const { handleSubmit: handleSubmitForReview, loading: isSubmitting } = useSubmitArticle();
  const { handleResubmit, loading: isResubmitting } = useResubmitArticle();
  const { handleDelete } = useDeleteArticle();

  const [deleteDialog, setDeleteDialog] = useState(false);

  if (articleLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-[600px] w-full" />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Article Not Found</h2>
          <p className="mt-2 text-muted-foreground">
            The article you're looking for doesn't exist or you don't have permission to edit it.
          </p>
          <Button asChild className="mt-4">
            <Link href="/author/articles">Back to Articles</Link>
          </Button>
        </div>
      </div>
    );
  }

  const status = article.status.toUpperCase();

  // Redirect if article is PENDING or APPROVED (cannot edit)
  if (status === ArticleStatus.PENDING || status === ArticleStatus.APPROVED) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Cannot Edit</h2>
          <p className="mt-2 text-muted-foreground">
            This article is {status.toLowerCase()} and cannot be edited.
          </p>
          <Button asChild className="mt-4">
            <Link href={`/author/articles/${articleId}`}>View Article</Link>
          </Button>
        </div>
      </div>
    );
  }

  const onSave = async () => {
    await handleSubmit();
  };

  const onSaveAndSubmit = async () => {
    await handleSubmit();
    setTimeout(() => {
      if (status === ArticleStatus.DRAFT) {
        handleSubmitForReview(articleId);
      } else if (status === ArticleStatus.REJECTED) {
        handleResubmit(articleId);
      }
    }, 500);
  };

  const onDelete = async () => {
    await handleDelete(articleId);
    router.push("/author/articles");
    setDeleteDialog(false);
  };

  return (
    <div className="space-y-6">
      {/* Header with gradient */}
      <div className="border-primary-subtle rounded-lg border p-6 shadow-sm bg-gradient-primary-soft">
        <div className="flex items-center gap-4">
          <Button
            asChild
            variant="ghost"
            size="icon"
            className="rounded-full bg-card text-primary"
          >
            <Link href={`/author/articles/${articleId}`}>
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Edit Article
            </h1>
            <p className="text-sm text-muted-foreground">
              Update your article and {status === ArticleStatus.REJECTED ? "resubmit" : "submit"} for review
            </p>
          </div>
        </div>
      </div>

      {/* Rejection Feedback */}
      {status === ArticleStatus.REJECTED && article.rejection_reason && (
        <RejectionFeedbackCard
          reason={article.rejection_reason}
          rejectedAt={article.updated_at}
        />
      )}

      {/* Form Card */}
      <Card className="relative border-border shadow-sm">
        <CardHeader className="border-b card-header-primary">
          <CardTitle className="text-primary">Article Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <ArticleForm formData={formData} onChange={handleChange} />

          {/* Action Buttons */}
          <div className="border-t border-border pt-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push(`/author/articles/${articleId}`)}
                  disabled={isLoading || isSubmitting || isResubmitting}
                  className="w-full border-border text-muted-foreground sm:w-auto"
                >
                  <X className="mr-2 h-4 w-4" />
                  Cancel
                </Button>

                {status === ArticleStatus.DRAFT && (
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => setDeleteDialog(true)}
                    disabled={isLoading || isSubmitting}
                    className="w-full sm:w-auto"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                )}
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button
                  onClick={onSave}
                  disabled={isLoading || isSubmitting || isResubmitting}
                  variant="outline"
                  className="w-full border-primary-light text-primary sm:w-auto"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>

                <Button
                  onClick={onSaveAndSubmit}
                  disabled={isLoading || isSubmitting || isResubmitting}
                  className="btn-primary-action w-full shadow-md transition-all hover:shadow-lg sm:w-auto"
                >
                  {isSubmitting || isResubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {status === ArticleStatus.REJECTED ? "Resubmitting..." : "Submitting..."}
                    </>
                  ) : (
                    <>
                      {status === ArticleStatus.REJECTED ? (
                        <>
                          <RotateCcw className="mr-2 h-4 w-4" />
                          Resubmit for Review
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Submit for Review
                        </>
                      )}
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <ArticleDeleteDialog
        open={deleteDialog}
        onOpenChange={setDeleteDialog}
        onConfirm={onDelete}
      />
    </div>
  );
}
