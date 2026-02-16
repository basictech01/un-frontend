"use client";

import { useState, useCallback } from "react";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { CREATE_ARTICLE } from "../data/article.mutations";
import { GET_ARTICLES } from "../data/article.queries";
import type { ArticleFormState } from "../types";
import { initialArticleForm } from "../types";
import type { Article } from "@/types/common";
import { apiClient } from "@/lib/api";

export function useCreateArticle() {
  const router = useRouter();
  const [formData, setFormData] = useState<ArticleFormState>(initialArticleForm);

  const [createMutation, { loading }] = useMutation<{
    createArticle: Article;
  }>(CREATE_ARTICLE, {
    refetchQueries: [{ query: GET_ARTICLES, variables: { first: 10 } }],
  });

  const handleChange = useCallback(
    (field: keyof ArticleFormState, value: unknown) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const handleSubmit = useCallback(async () => {
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

      // Upload image if file exists
      if (formData.coverImageFile?.file) {
        const uploadResult = await apiClient.uploadImage(
          formData.coverImageFile.file
        );
        coverImageUrl = uploadResult.url;
      }

      await createMutation({
        variables: {
          input: {
            title: formData.title,
            content: formData.content,
            excerpt: formData.excerpt || undefined,
            section: formData.section,
            subsections: formData.subsections,
            coverImage: coverImageUrl || undefined,
            status: formData.status,
          },
        },
      });
      toast.success("Article created successfully");
      router.push("/admin");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to create article";
      toast.error(message);
    }
  }, [formData, createMutation, router]);

  const handleReset = useCallback(() => {
    setFormData(initialArticleForm);
  }, []);

  return { formData, handleChange, handleSubmit, handleReset, isLoading: loading };
}
