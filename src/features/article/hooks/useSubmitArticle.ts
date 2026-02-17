"use client";

import { useMutation } from "@apollo/client";
import { toast } from "sonner";
import { SUBMIT_ARTICLE } from "../data/article.mutations";
import { GET_MY_ARTICLES } from "../data/article.queries";
import type { Article } from "@/types/common";

export function useSubmitArticle() {
  const [submitMutation, { loading }] = useMutation<{
    submitArticle: Article;
  }>(SUBMIT_ARTICLE, {
    refetchQueries: [{ query: GET_MY_ARTICLES, variables: { first: 10 } }],
  });

  const handleSubmit = async (id: number) => {
    try {
      await submitMutation({
        variables: { id },
      });
      toast.success("Article submitted for review");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to submit article";
      toast.error(message);
      throw error;
    }
  };

  return { handleSubmit, loading };
}
