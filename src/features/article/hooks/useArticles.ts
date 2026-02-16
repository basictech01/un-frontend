"use client";

import { useQuery } from "@apollo/client";
import { GET_ARTICLES } from "../data/article.queries";
import type { ArticleConnection } from "@/types/common";
import type { ArticleFilterState } from "../types";

const PAGE_SIZE = 10;

export function useArticles(filter: ArticleFilterState) {
  const variables = {
    first: PAGE_SIZE,
    filter: {
      ...(filter.search ? { search: filter.search } : {}),
      ...(filter.status ? { status: filter.status } : {}),
      ...(filter.section ? { section: filter.section } : {}),
    },
  };

  const { data, loading, error, fetchMore } = useQuery<{
    articles: ArticleConnection;
  }>(GET_ARTICLES, { variables });

  const articles = data?.articles.edges.map((e) => e.node) ?? [];
  const pageInfo = data?.articles.pageInfo;
  const totalCount = data?.articles.totalCount ?? 0;

  const loadMore = () => {
    if (!pageInfo?.hasNextPage || !pageInfo.endCursor) return;
    fetchMore({
      variables: { ...variables, after: pageInfo.endCursor },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          articles: {
            ...fetchMoreResult.articles,
            edges: [
              ...prev.articles.edges,
              ...fetchMoreResult.articles.edges,
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
  };
}
