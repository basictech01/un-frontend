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
  const { formData, handleChange, handleSubmit, isLoading } =
    useCreateArticle();

  const handleSaveDraft = () => {
    handleChange("status", ArticleStatus.DRAFT);
    setTimeout(() => handleSubmit(), 0);
  };

  const handlePublish = () => {
    handleChange("status", ArticleStatus.PENDING);
    setTimeout(() => handleSubmit(), 0);
  };

  const handleReset = () => {
    window.location.reload();
  };

  return (
    <div className="space-y-6 pb-24">
      {/* Header with gradient */}
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
            <Link href="/admin/articles">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight" style={{ color: 'hsl(var(--color-foreground))' }}>
              Create New Article
            </h1>
            <p className="mt-1 text-sm" style={{ color: 'hsl(var(--color-muted-foreground))' }}>
              Fill in the details below to create and publish your article
            </p>
          </div>
        </div>
      </div>

      <Card className="relative shadow-sm" style={{ borderColor: 'hsl(var(--color-border))' }}>
        <CardHeader
          className="border-b"
          style={{
            borderColor: 'hsl(var(--color-border))',
            background: 'linear-gradient(135deg, hsl(var(--color-primary) / 0.03) 0%, hsl(var(--color-primary) / 0.05) 100%)'
          }}
        >
          <CardTitle style={{ color: 'hsl(var(--color-primary))' }}>Article Details</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <ArticleForm formData={formData} onChange={handleChange} />
        </CardContent>

        {/* Sticky Bottom Action Bar */}
        <div
          className="sticky bottom-0 -mx-6 -mb-6 mt-8 border-t px-6 py-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]"
          style={{
            backgroundColor: 'hsl(var(--color-card))',
            borderColor: 'hsl(var(--color-border))'
          }}
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={handleReset}
              className="order-2 sm:order-1"
              disabled={isLoading}
              style={{
                borderColor: 'hsl(var(--color-border))',
                color: 'hsl(var(--color-muted-foreground))'
              }}
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset Form
            </Button>

            <div className="order-1 flex gap-3 sm:order-2">
              <Button
                type="button"
                onClick={handleSaveDraft}
                disabled={isLoading}
                className="flex-1 shadow-sm sm:flex-none"
                style={{
                  backgroundColor: 'hsl(var(--color-secondary) / 0.1)',
                  borderColor: 'hsl(var(--color-secondary) / 0.3)',
                  color: 'hsl(var(--color-secondary))',
                  border: '1px solid'
                }}
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
                className="flex-1 shadow-md transition-all hover:shadow-lg sm:flex-none"
                style={{
                  backgroundColor: 'hsl(var(--color-primary))',
                  color: 'white'
                }}
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
      </Card>
    </div>
  );
}
