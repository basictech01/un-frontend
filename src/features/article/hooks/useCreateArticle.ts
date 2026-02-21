"use client";

import { useState, useCallback } from "react";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { CREATE_ARTICLE } from "../data/article.mutations";
import { SUBMIT_ARTICLE } from "../data/article.mutations";
import type { ArticleFormState } from "../types";
import { initialArticleForm } from "../types";
import type { Article } from "@/types/common";
import { apiClient } from "@/lib/api";

export function useCreateArticle(redirectPath: string = "/admin") {
  const router = useRouter();
  const [formData, setFormData] = useState<ArticleFormState>(initialArticleForm);

  const [createMutation, { loading: createLoading }] = useMutation<{
    createArticle: Article;
  }>(CREATE_ARTICLE);

  const [submitMutation, { loading: submitLoading }] = useMutation<{
    submitArticle: Article;
  }>(SUBMIT_ARTICLE);

  const handleChange = useCallback(
    (field: keyof ArticleFormState, value: unknown) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const handleSubmit = useCallback(
    async (submitForReview = false) => {
      if (!formData.title.trim()) {
        toast.error("Title is required");
        return;
      }
      if (!formData.content.trim()) {
        toast.error("Content is required");
        return;
      }
      if (!formData.section) {
        toast.error("Section is required");
        return;
      }
      if (formData.subsections.length === 0) {
        toast.error("At least one subsection is required");
        return;
      }

      try {
        let coverImageUrl = "";

        if (formData.coverImageFile?.file) {
          const uploadResult = await apiClient.uploadImage(
            formData.coverImageFile.file
          );
          coverImageUrl = uploadResult.url;
        }

        const result = await createMutation({
          variables: {
            input: {
              title: formData.title,
              content: formData.content,
              excerpt: formData.excerpt || undefined,
              section: formData.section,
              subsections: formData.subsections,
              coverImage: coverImageUrl || undefined,
            },
          },
        });

        const newArticleId = result.data?.createArticle.id;

        if (submitForReview && newArticleId) {
          await submitMutation({ variables: { id: newArticleId } });
          toast.success("Article submitted for review");
        } else {
          toast.success("Article saved as draft");
        }

        router.push(redirectPath);
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Failed to save article";
        toast.error(message);
      }
    },
    [formData, createMutation, submitMutation, router, redirectPath]
  );

  const handleReset = useCallback(() => {
    setFormData(initialArticleForm);
  }, []);

  return {
    formData,
    handleChange,
    handleSubmit,
    handleReset,
    isLoading: createLoading || submitLoading,
  };
}
