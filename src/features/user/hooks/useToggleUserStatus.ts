"use client";

import { useMutation } from "@apollo/client";
import { toast } from "sonner";
import { TOGGLE_USER_STATUS } from "../data/user.mutations";
import { GET_USERS } from "../data/user.queries";
import type { UserProfile } from "@/types/common";

export function useToggleUserStatus() {
  const [toggleMutation, { loading }] = useMutation<{
    toggleUserStatus: UserProfile;
  }>(TOGGLE_USER_STATUS, {
    refetchQueries: [{ query: GET_USERS, variables: { first: 20 } }],
  });

  const handleToggle = async (id: number, isActive: boolean) => {
    try {
      await toggleMutation({ variables: { id, isActive } });
      toast.success(
        isActive ? "User activated" : "User deactivated"
      );
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Failed to toggle user status";
      toast.error(message);
    }
  };

  return { handleToggle, isLoading: loading };
}
