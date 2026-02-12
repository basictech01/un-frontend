"use client";

import { useQuery } from "@apollo/client";
import { GET_PENDING_ARTICLES } from "../data/article.queries";
import type { ArticleConnection } from "@/types/common";

const PAGE_SIZE = 10;

export function usePendingArticles() {
  const { data, loading, error, fetchMore, refetch } = useQuery<{
    pendingArticles: ArticleConnection;
  }>(GET_PENDING_ARTICLES, { variables: { first: PAGE_SIZE } });

  const articles = data?.pendingArticles.edges.map((e) => e.node) ?? [];
  const pageInfo = data?.pendingArticles.pageInfo;
  const totalCount = data?.pendingArticles.totalCount ?? 0;

  const loadMore = () => {
    if (!pageInfo?.hasNextPage || !pageInfo.endCursor) return;
    fetchMore({
      variables: { first: PAGE_SIZE, after: pageInfo.endCursor },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          pendingArticles: {
            ...fetchMoreResult.pendingArticles,
            edges: [
              ...prev.pendingArticles.edges,
              ...fetchMoreResult.pendingArticles.edges,
            ],
          },
        };
      },
    });
  };

  return {
    articles,
    loading,
    error,
    totalCount,
    hasNextPage: pageInfo?.hasNextPage ?? false,
    loadMore,
    refetch,
  };
}
