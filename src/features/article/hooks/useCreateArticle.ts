"use client";

import { useState, useCallback } from "react";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { CREATE_ARTICLE } from "../data/article.mutations";
import { SUBMIT_ARTICLE } from "../data/article.mutations";
import type { ArticleFormState, ArticleFormErrors } from "../types";
import { initialArticleForm } from "../types";
import type { Article } from "@/types/common";
import { apiClient } from "@/lib/api";

export function useCreateArticle(redirectPath: string = "/admin") {
  const router = useRouter();
  const [formData, setFormData] = useState<ArticleFormState>(initialArticleForm);
  const [errors, setErrors] = useState<ArticleFormErrors>({});

  const [createMutation, { loading: createLoading }] = useMutation<{
    createArticle: Article;
  }>(CREATE_ARTICLE);

  const [submitMutation, { loading: submitLoading }] = useMutation<{
    submitArticle: Article;
  }>(SUBMIT_ARTICLE);

  const handleChange = useCallback(
    (field: keyof ArticleFormState, value: unknown) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      // Clear error for the field being updated
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    },
    []
  );

  const handleSubmit = useCallback(
    async (submitForReview = false) => {
      const newErrors: ArticleFormErrors = {};
      if (!formData.title.trim()) newErrors.title = "Title is required";
      if (!formData.section) newErrors.section = "Section is required";
      if (formData.subsections.length === 0) newErrors.subsections = "At least one subsection is required";
      if (!formData.content.trim()) newErrors.content = "Content is required";

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        toast.error("Please fill in all required fields");
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
    setErrors({});
  }, []);

  return {
    formData,
    errors,
    handleChange,
    handleSubmit,
    handleReset,
    isLoading: createLoading || submitLoading,
  };
}
