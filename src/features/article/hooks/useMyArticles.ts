"use client";

import { useQuery } from "@apollo/client";
import { GET_MY_ARTICLES } from "../data/article.queries";
import type { ArticleConnection } from "@/types/common";

const PAGE_SIZE = 10;

interface UseMyArticlesOptions {
  status?: string;
}

export function useMyArticles(options: UseMyArticlesOptions = {}) {
  const variables = {
    first: PAGE_SIZE,
    ...(options.status ? { status: options.status } : {}),
  };

  const { data, loading, error, fetchMore, refetch } = useQuery<{
    myArticles: ArticleConnection;
  }>(GET_MY_ARTICLES, { variables });

  // Reverse to show latest articles first
  const articles = data?.myArticles.edges.map((e) => e.node).reverse() ?? [];
  const pageInfo = data?.myArticles.pageInfo;
  const totalCount = data?.myArticles.totalCount ?? 0;

  const loadMore = () => {
    if (!pageInfo?.hasNextPage || !pageInfo.endCursor) return;
    fetchMore({
      variables: { ...variables, after: pageInfo.endCursor },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          myArticles: {
            ...fetchMoreResult.myArticles,
            edges: [
              ...prev.myArticles.edges,
              ...fetchMoreResult.myArticles.edges,
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
