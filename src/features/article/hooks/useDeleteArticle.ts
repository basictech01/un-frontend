"use client";

import { useMutation } from "@apollo/client";
import { toast } from "sonner";
import { DELETE_ARTICLE } from "../data/article.mutations";
import { GET_ARTICLES } from "../data/article.queries";
import type { Article } from "@/types/common";

export function useDeleteArticle() {
  const [deleteMutation, { loading }] = useMutation<{
    deleteArticle: Article;
  }>(DELETE_ARTICLE, {
    refetchQueries: [{ query: GET_ARTICLES, variables: { first: 10 } }],
  });

  const handleDelete = async (id: number) => {
    try {
      await deleteMutation({ variables: { id } });
      toast.success("Article deleted successfully");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to delete article";
      toast.error(message);
    }
  };

  return { handleDelete, isLoading: loading };
}
