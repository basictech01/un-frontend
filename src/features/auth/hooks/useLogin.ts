"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuth } from "./useAuth";
import { UserRole } from "@/types/enums";

export function useLogin() {
  const { login, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const user = await login(email, password);
      toast.success(`Welcome back, ${user.name}!`);

      // Redirect based on role
      if (user.role === UserRole.ADMIN) {
        router.push("/admin");
      } else if (user.role === UserRole.AUTHOR) {
        router.push("/author");
      } else {
        router.push("/");
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Login failed";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return { handleLogin, isLoading: isLoading || authLoading };
}
