"use client";

import { useState, useCallback, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { toast } from "sonner";
import { UPDATE_PROFILE_MUTATION } from "../data/auth.mutations";
import { useAuth } from "./useAuth";
import type { UserProfile } from "@/types/common";

interface ProfileFormState {
  name: string;
  bio: string;
  profession: string;
  profile_photo: string;
}

export function useProfile() {
  const { user, updateUser } = useAuth();
  const [updateProfileMutation, { loading }] = useMutation<{
    updateProfile: UserProfile;
  }>(UPDATE_PROFILE_MUTATION);

  const [formData, setFormData] = useState<ProfileFormState>({
    name: "",
    bio: "",
    profession: "",
    profile_photo: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        bio: user.bio ?? "",
        profession: user.profession ?? "",
        profile_photo: user.profile_photo ?? "",
      });
    }
  }, [user]);

  const handleChange = useCallback(
    (field: string, value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const handleSubmit = useCallback(async () => {
    try {
      const input: Record<string, string | null> = {
        name: formData.name,
        bio: formData.bio || null,
        profession: formData.profession || null,
        profile_photo: formData.profile_photo || null,
      };

      const { data } = await updateProfileMutation({
        variables: { input },
      });

      if (data?.updateProfile) {
        updateUser(data.updateProfile);
        toast.success("Profile updated successfully");
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to update profile";
      toast.error(message);
    }
  }, [formData, updateProfileMutation, updateUser]);

  return { formData, handleChange, handleSubmit, isLoading: loading, user };
}
