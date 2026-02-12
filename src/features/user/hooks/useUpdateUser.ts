"use client";

import { useMutation } from "@apollo/client";
import { toast } from "sonner";
import { ADMIN_UPDATE_USER } from "../data/user.mutations";
import { GET_AUTHORS } from "../data/user.queries";
import type { UserProfile } from "@/types/common";

export function useUpdateUser() {
  const [updateMutation, { loading }] = useMutation<{
    adminUpdateUser: UserProfile;
  }>(ADMIN_UPDATE_USER, {
    refetchQueries: [{ query: GET_AUTHORS, variables: { first: 10 } }],
  });

  const handleUpdate = async (
    id: number,
    input: {
      name?: string;
      bio?: string | null;
      profession?: string | null;
      profile_photo?: string | null;
    }
  ) => {
    try {
      await updateMutation({ variables: { id, input } });
      toast.success("User updated successfully");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to update user";
      toast.error(message);
    }
  };

  return { handleUpdate, isLoading: loading };
}
