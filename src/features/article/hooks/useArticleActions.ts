"use client";

import { useMutation } from "@apollo/client";
import { toast } from "sonner";
import {
  APPROVE_ARTICLE,
  REJECT_ARTICLE,
} from "../data/article.mutations";
import type { Article } from "@/types/common";

export function useArticleActions() {
  const [approveMutation, { loading: approving }] = useMutation<{
    approveArticle: Article;
  }>(APPROVE_ARTICLE, {
    refetchQueries: "active",
    awaitRefetchQueries: true,
  });

  const [rejectMutation, { loading: rejecting }] = useMutation<{
    rejectArticle: Article;
  }>(REJECT_ARTICLE, {
    refetchQueries: "active",
    awaitRefetchQueries: true,
  });

  const handleApprove = async (id: number) => {
    try {
      await approveMutation({ variables: { id } });
      toast.success("Article approved successfully!");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to approve article";
      toast.error(message);
    }
  };

  const handleReject = async (id: number, reason: string) => {
    try {
      await rejectMutation({ variables: { id, reason } });
      toast.success("Article rejected successfully!");
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
