"use client";

import { useMutation } from "@apollo/client";
import { toast } from "sonner";
import {
  APPROVE_ARTICLE,
  REJECT_ARTICLE,
} from "../data/article.mutations";
import {
  GET_ARTICLES,
  GET_PENDING_ARTICLES,
} from "../data/article.queries";
import type { Article } from "@/types/common";

export function useArticleActions() {
  const refetchQueries = [
    { query: GET_ARTICLES, variables: { first: 10 } },
    { query: GET_PENDING_ARTICLES, variables: { first: 10 } },
  ];

  const [approveMutation, { loading: approving }] = useMutation<{
    approveArticle: Article;
  }>(APPROVE_ARTICLE, { refetchQueries });

  const [rejectMutation, { loading: rejecting }] = useMutation<{
    rejectArticle: Article;
  }>(REJECT_ARTICLE, { refetchQueries });

  const handleApprove = async (id: number) => {
    try {
      await approveMutation({ variables: { id } });
      toast.success("Article approved");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to approve article";
      toast.error(message);
    }
  };

  const handleReject = async (id: number, reason: string) => {
    try {
      await rejectMutation({ variables: { id, reason } });
      toast.success("Article rejected");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to reject article";
      toast.error(message);
    }
  };

  return {
    handleApprove,
    handleReject,
    isApproving: approving,
    isRejecting: rejecting,
  };
}
