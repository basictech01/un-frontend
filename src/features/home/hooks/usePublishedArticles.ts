"use client";

import { useQuery } from "@apollo/client";
import { GET_APPROVED_ARTICLES } from "@/features/article/data/article.queries";
import type { ArticleConnection } from "@/types/common";

const PAGE_SIZE = 20;

export function usePublishedArticles() {
  const { data, loading, error } = useQuery<{
    approvedArticles: ArticleConnection;
  }>(GET_APPROVED_ARTICLES, {
    variables: { first: PAGE_SIZE },
  });

  // Reverse so newest articles come first (hero shows latest, sidebar shows newest)
  const articles = data?.approvedArticles.edges.map((e) => e.node).reverse() ?? [];

  return { articles, loading, error };
}
