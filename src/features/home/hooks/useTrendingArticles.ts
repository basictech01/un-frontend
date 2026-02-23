"use client";

import { useQuery } from "@apollo/client";
import { GET_TRENDING_ARTICLES } from "@/features/article/data/article.queries";
import type { ArticleConnection } from "@/types/common";

export function useTrendingArticles(first = 20) {
  const { data, loading, error } = useQuery<{
    trendingArticles: ArticleConnection;
  }>(GET_TRENDING_ARTICLES, {
    variables: { first },
  });

  const articles = data?.trendingArticles.edges.map((e) => e.node) ?? [];

  return { articles, loading, error };
}
