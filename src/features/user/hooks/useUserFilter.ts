"use client";

import { useState } from "react";
import type { UserFilterState } from "../types";

export function useUserFilter() {
  const [filter, setFilter] = useState<UserFilterState>({
    search: "",
    role: "",
    isActive: null,
  });

  const setSearch = (search: string) => {
    setFilter((prev) => ({ ...prev, search }));
  };

  const setRole = (role: string) => {
    setFilter((prev) => ({ ...prev, role: role === "all" ? "" : role }));
  };

  const setStatus = (status: string) => {
    setFilter((prev) => ({
      ...prev,
      isActive:
        status === "active" ? true : status === "inactive" ? false : null,
    }));
  };

  const resetFilters = () => {
    setFilter({
      search: "",
      role: "",
      isActive: null,
    });
  };

  return {
    filter,
    setSearch,
    setRole,
    setStatus,
    resetFilters,
  };
}
