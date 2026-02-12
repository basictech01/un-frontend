"use client";

import { useQuery } from "@apollo/client";
import { GET_ARTICLE } from "../data/article.queries";
import type { Article } from "@/types/common";

export function useArticle(id: number) {
  const { data, loading, error } = useQuery<{ article: Article }>(
    GET_ARTICLE,
    { variables: { id }, skip: !id }
  );

  return { article: data?.article ?? null, loading, error };
}
