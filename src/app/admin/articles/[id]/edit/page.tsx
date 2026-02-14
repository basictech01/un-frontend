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
        <CardHeader
          className="border-b card-header-primary"
        >
          <CardTitle style={{ color: 'hsl(var(--color-primary))' }}>Article Details</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <ArticleForm formData={formData} onChange={handleChange} />
        </CardContent>

        {/* Sticky Action Bar */}
        <div
          className="sticky bottom-0 -mx-6 -mb-6 mt-8 border-t px-6 py-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]"
          style={{
            backgroundColor: 'hsl(var(--color-card))',
            borderColor: 'hsl(var(--color-border))'
          }}
        >
          <div className="flex items-center justify-between gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push(`/admin/articles/${articleId}`)}
              disabled={isLoading}
              className="border-border text-muted-foreground"
            >
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>

            <Button
              onClick={onSubmit}
              disabled={isLoading}
              className="bg-primary text-primary-foreground shadow-md"
            >
              <Save className="mr-2 h-4 w-4" />
              {isLoading ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
