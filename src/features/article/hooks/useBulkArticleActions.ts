import { useMutation } from "@apollo/client";
import { BULK_APPROVE_ARTICLES, BULK_DELETE_ARTICLES } from "../data/article.mutations";
import { GET_ARTICLES } from "../data/article.queries";
import { toast } from "sonner";

export function useBulkArticleActions() {
  const [bulkApprove, { loading: approvingLoading }] = useMutation(
    BULK_APPROVE_ARTICLES,
    {
      refetchQueries: [{ query: GET_ARTICLES }],
      onCompleted: () => {
        toast.success("Articles approved successfully");
      },
      onError: (error) => {
        toast.error(error.message || "Failed to approve articles");
      },
    }
  );

  const [bulkDelete, { loading: deletingLoading }] = useMutation(
    BULK_DELETE_ARTICLES,
    {
      refetchQueries: [{ query: GET_ARTICLES }],
      onCompleted: () => {
        toast.success("Articles deleted successfully");
      },
      onError: (error) => {
        toast.error(error.message || "Failed to delete articles");
      },
    }
  );

  const handleBulkApprove = async (ids: number[]) => {
    if (ids.length === 0) {
      toast.error("No articles selected");
      return;
    }

    try {
      await bulkApprove({ variables: { ids } });
    } catch (error) {
      console.error("Bulk approve error:", error);
    }
  };

  const handleBulkDelete = async (ids: number[]) => {
    if (ids.length === 0) {
      toast.error("No articles selected");
      return;
    }

    try {
      await bulkDelete({ variables: { ids } });
    } catch (error) {
      console.error("Bulk delete error:", error);
    }
  };

  return {
    handleBulkApprove,
    handleBulkDelete,
    loading: approvingLoading || deletingLoading,
  };
}
