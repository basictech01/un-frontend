"use client";

import { useQuery } from "@apollo/client";
import { GET_USERS } from "../data/user.queries";
import type { UserConnection } from "@/types/common";
import type { UserFilterState } from "../types";

const PAGE_SIZE = 20;

export function useUsers(filter: UserFilterState) {
  const variables = {
    first: PAGE_SIZE,
    filter: {
      ...(filter.search ? { search: filter.search } : {}),
      ...(filter.role ? { role: filter.role } : {}),
      ...(filter.isActive !== null ? { isActive: filter.isActive } : {}),
    },
  };

  const { data, loading, error, fetchMore, refetch } = useQuery<{
    users: UserConnection;
  }>(GET_USERS, { variables });

  const users = data?.users.edges.map((e) => e.node) ?? [];
  const pageInfo = data?.users.pageInfo;
  const totalCount = data?.users.totalCount ?? 0;

  const loadMore = () => {
    if (!pageInfo?.hasNextPage || !pageInfo.endCursor) return;
    fetchMore({
      variables: { ...variables, after: pageInfo.endCursor },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          users: {
            ...fetchMoreResult.users,
            edges: [...prev.users.edges, ...fetchMoreResult.users.edges],
          },
        };
      },
    });
  };

  return {
    users,
    loading,
    error,
    totalCount,
    hasNextPage: pageInfo?.hasNextPage ?? false,
    loadMore,
    refetch,
  };
}
