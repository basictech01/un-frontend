"use client";

import { useMutation } from "@apollo/client";
import { toast } from "sonner";
import { RESUBMIT_ARTICLE } from "../data/article.mutations";
import { GET_MY_ARTICLES } from "../data/article.queries";
import type { Article } from "@/types/common";

export function useResubmitArticle() {
  const [resubmitMutation, { loading }] = useMutation<{
    resubmitArticle: Article;
  }>(RESUBMIT_ARTICLE, {
    refetchQueries: [{ query: GET_MY_ARTICLES, variables: { first: 10 } }],
  });

  const handleResubmit = async (id: number) => {
    try {
      await resubmitMutation({
        variables: { id },
      });
      toast.success("Article resubmitted for review");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to resubmit article";
      toast.error(message);
      throw error;
    }
  };

  return { handleResubmit, loading };
}
