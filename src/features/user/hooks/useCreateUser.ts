"use client";

import { useState, useCallback } from "react";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { CREATE_USER } from "../data/user.mutations";
import { GET_USERS } from "../data/user.queries";
import type { UserProfile } from "@/types/common";
import { UserRole } from "@/types/enums";

export interface UserFormState {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  is_active: boolean;
}

export const initialUserForm: UserFormState = {
  name: "",
  email: "",
  password: "",
  role: UserRole.AUTHOR,
  is_active: true,
};

export function useCreateUser() {
  const router = useRouter();
  const [formData, setFormData] = useState<UserFormState>(initialUserForm);

  const [createMutation, { loading }] = useMutation<{
    signup: { user: UserProfile };
  }>(CREATE_USER, {
    refetchQueries: [{ query: GET_USERS, variables: { first: 10 } }],
  });

  const handleChange = useCallback(
    (field: keyof UserFormState, value: unknown) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const handleSubmit = useCallback(async () => {
    // Validation
    if (!formData.name.trim()) {
      toast.error("Name is required");
      return;
    }
    if (!formData.email.trim()) {
      toast.error("Email is required");
      return;
    }
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    if (!formData.password) {
      toast.error("Password is required");
      return;
    }
    if (formData.password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }

    try {
      await createMutation({
        variables: {
          input: {
            name: formData.name.trim(),
            email: formData.email.trim().toLowerCase(),
            password: formData.password,
            role: formData.role,
            is_active: formData.is_active,
          },
        },
      });
      toast.success("User created successfully");
      router.push("/admin/users");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to create user";
      toast.error(message);
    }
  }, [formData, createMutation, router]);

  const handleReset = useCallback(() => {
    setFormData(initialUserForm);
  }, []);

  return { formData, handleChange, handleSubmit, handleReset, isLoading: loading };
}
