"use client";

import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_APPROVED_ARTICLES } from "../data/article.queries";
import type { ArticleConnection } from "@/types/common";

export function useSectionArticles(section: string) {
  const [loadingMore, setLoadingMore] = useState(false);

  const { data, loading, error, fetchMore } = useQuery<{
    approvedArticles: ArticleConnection;
  }>(GET_APPROVED_ARTICLES, {
    variables: { first: 50, filter: { section } },
    skip: !section,
  });

  const articles = data?.approvedArticles.edges.map((e) => e.node) ?? [];
  const pageInfo = data?.approvedArticles.pageInfo;
  const hasNextPage = pageInfo?.hasNextPage ?? false;

  async function loadMore() {
    if (!hasNextPage || !pageInfo?.endCursor || loadingMore) return;
    setLoadingMore(true);
    try {
      await fetchMore({
        variables: {
          first: 12,
          after: pageInfo.endCursor,
          filter: { section },
        },
        updateQuery(prev, { fetchMoreResult }) {
          if (!fetchMoreResult) return prev;
          return {
            approvedArticles: {
              ...fetchMoreResult.approvedArticles,
              edges: [
                ...prev.approvedArticles.edges,
                ...fetchMoreResult.approvedArticles.edges,
              ],
            },
          };
        },
      });
    } finally {
      setLoadingMore(false);
    }
  }

  return { articles, loading, error, hasNextPage, loadingMore, loadMore };
}
