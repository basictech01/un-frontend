"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import { Button } from "@/ui/button";
import { ArrowLeft, Save, X } from "lucide-react";
import { ArticleForm } from "@/features/article/ui/molecules/ArticleForm";
import { useArticle } from "@/features/article/hooks/useArticle";
import { useUpdateArticle } from "@/features/article/hooks/useUpdateArticle";
import { Skeleton } from "@/ui/skeleton";
import Link from "next/link";

export default function EditArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const articleId = parseInt(id, 10);

  const { article, loading: articleLoading } = useArticle(articleId);
  const { formData, handleChange, handleSubmit, isLoading } = useUpdateArticle(article);

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
            <Link href="/admin/articles">Back to Articles</Link>
          </Button>
        </div>
      </div>
    );
  }

  const onSubmit = async () => {
    await handleSubmit();
    router.push(`/admin/articles/${articleId}`);
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
            <Link href={`/admin/articles/${articleId}`}>
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Edit Article
            </h1>
            <p className="text-sm text-muted-foreground">
              Update article details and content
            </p>
          </div>
        </div>
      </div>

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
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push(`/admin/articles/${articleId}`)}
                disabled={isLoading}
                className="w-full border-border text-muted-foreground sm:w-auto"
              >
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>

              <Button
                onClick={onSubmit}
                disabled={isLoading}
                className="w-full bg-primary text-primary-foreground shadow-md sm:w-auto"
              >
                <Save className="mr-2 h-4 w-4" />
                {isLoading ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
