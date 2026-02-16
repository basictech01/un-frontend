"use client";

import { useState, useCallback } from "react";
import type { ArticleFilterState } from "../types";
import type { ArticleStatus } from "@/types/enums";

export function useArticleFilter() {
  const [filter, setFilter] = useState<ArticleFilterState>({
    search: "",
    status: "",
    section: "",
  });

  const setSearch = useCallback((search: string) => {
    setFilter((prev) => ({ ...prev, search }));
  }, []);

  const setStatus = useCallback((status: ArticleStatus | "") => {
    setFilter((prev) => ({ ...prev, status }));
  }, []);

  const setSection = useCallback((section: string) => {
    setFilter((prev) => ({ ...prev, section }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilter({ search: "", status: "", section: "" });
  }, []);

  return { filter, setSearch, setStatus, setSection, resetFilters };
}
