"use client";

import { useQuery } from "@apollo/client";
import { GET_APPROVED_ARTICLES } from "../data/article.queries";
import { useDebounce } from "@/hooks/useDebounce";
import type { ArticleConnection } from "@/types/common";

export function useSearchArticles(query: string) {
  const debouncedQuery = useDebounce(query.trim(), 400);

  const { data, loading } = useQuery<{
    approvedArticles: ArticleConnection;
  }>(GET_APPROVED_ARTICLES, {
    variables: { first: 10, filter: { search: debouncedQuery } },
    skip: !debouncedQuery,
  });

  const articles = data?.approvedArticles.edges.map((e) => e.node) ?? [];

  return { articles, loading, hasQuery: debouncedQuery.length > 0 };
}
