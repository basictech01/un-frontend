"use client";

import { Button } from "@/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/select";
import { Label } from "@/ui/label";
import { ArrowLeft, Loader2, Save, Check, RotateCcw } from "lucide-react";
import Link from "next/link";
import { ArticleForm } from "@/features/article/ui/molecules/ArticleForm";
import { useCreateArticle } from "@/features/article/hooks/useCreateArticle";
import { ArticleStatus } from "@/types/enums";

export default function CreateArticlePage() {
  const { formData, handleChange, handleSubmit, handleReset, isLoading } =
    useCreateArticle();

  const handleSaveDraft = () => {
    handleChange("status", ArticleStatus.DRAFT);
    setTimeout(() => handleSubmit(), 0);
  };

  const handlePublish = () => {
    handleChange("status", ArticleStatus.PENDING);
    setTimeout(() => handleSubmit(), 0);
  };

  return (
    <div className="space-y-6 pb-24">
      {/* Header with gradient */}
      <div className="border-primary-subtle rounded-lg border p-6 shadow-sm bg-gradient-primary-soft">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            asChild
            className="rounded-full bg-card text-primary"
          >
            <Link href="/admin/articles">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Create New Article
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Fill in the details below to create and publish your article
            </p>
          </div>
        </div>
      </div>

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
                onClick={handleReset}
                className="w-full border-border text-muted-foreground sm:w-auto"
                disabled={isLoading}
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Reset Form
              </Button>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button
                  type="button"
                  onClick={handleSaveDraft}
                  disabled={isLoading}
                  className="w-full border border-secondary-light bg-secondary-ultra-light text-secondary shadow-sm sm:w-auto"
                >
                  {isLoading && formData.status === ArticleStatus.DRAFT ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Draft
                    </>
                  )}
                </Button>

                <Button
                  onClick={handlePublish}
                  disabled={isLoading}
                  className="btn-primary-action w-full shadow-md transition-all hover:shadow-lg sm:w-auto"
                >
                  {isLoading && formData.status === ArticleStatus.PENDING ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Publishing...
                    </>
                  ) : (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Publish Article
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
