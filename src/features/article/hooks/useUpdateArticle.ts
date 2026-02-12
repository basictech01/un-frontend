"use client";

import { useState, useCallback, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { toast } from "sonner";
import { UPDATE_ARTICLE } from "../data/article.mutations";
import type { ArticleFormState } from "../types";
import type { Article } from "@/types/common";
import { ArticleStatus } from "@/types/enums";
import { apiClient } from "@/lib/api";

export function useUpdateArticle(article: Article | null) {
  const [formData, setFormData] = useState<ArticleFormState>({
    title: "",
    content: "",
    excerpt: "",
    section: "",
    subsections: [],
    coverImage: "",
    coverImageFile: null,
    status: ArticleStatus.DRAFT,
  });

  useEffect(() => {
    if (article) {
      setFormData({
        title: article.title,
        content: article.content,
        excerpt: article.excerpt ?? "",
        section: article.section,
        subsections: article.subsections ?? [],
        coverImage: article.cover_image ?? "",
        coverImageFile: article.cover_image
          ? { previewUrl: article.cover_image }
          : null,
        status: article.status as ArticleStatus,
      });
    }
  }, [article]);

  const [updateMutation, { loading }] = useMutation<{
    updateArticle: Article;
  }>(UPDATE_ARTICLE);

  const handleChange = useCallback(
    (field: keyof ArticleFormState, value: unknown) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const handleSubmit = useCallback(async () => {
    if (!article) return;

    try {
      let coverImageUrl = formData.coverImage;

      // Upload image if a new file was selected
      if (formData.coverImageFile?.file) {
        const uploadResult = await apiClient.uploadImage(
          formData.coverImageFile.file
        );
        coverImageUrl = uploadResult.url;
      }

      await updateMutation({
        variables: {
          id: article.id,
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
      toast.success("Article updated successfully");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to update article";
      toast.error(message);
    }
  }, [article, formData, updateMutation]);

  return { formData, handleChange, handleSubmit, isLoading: loading };
}
