"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { useMutation, useLazyQuery } from "@apollo/client";
import {
  LOGIN_MUTATION,
  REFRESH_TOKEN_MUTATION,
  ME_QUERY,
} from "../data/auth.mutations";
import { apolloClient } from "@/graphql/client";
import type { UserProfile, AuthPayload } from "@/types/common";

interface AuthContextValue {
  user: UserProfile | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<UserProfile>;
  logout: () => void;
  updateUser: (user: UserProfile) => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function isTokenExpired(token: string): boolean {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp * 1000 < Date.now();
  } catch {
    return true;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [loginMutation] = useMutation<{ login: AuthPayload }>(LOGIN_MUTATION);
  const [refreshMutation] = useMutation<{
    refreshToken: { token: string };
  }>(REFRESH_TOKEN_MUTATION);
  const [fetchMe] = useLazyQuery<{ me: UserProfile }>(ME_QUERY);

  const storeAuth = useCallback(
    (authToken: string, refreshToken: string, userData: UserProfile) => {
      localStorage.setItem("auth_token", authToken);
      localStorage.setItem("refresh_token", refreshToken);
      localStorage.setItem("user", JSON.stringify(userData));
      setToken(authToken);
      setUser(userData);
    },
    []
  );

  const clearAuth = useCallback(() => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
    apolloClient.clearStore();
  }, []);

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem("auth_token");
      const storedRefresh = localStorage.getItem("refresh_token");
      const storedUser = localStorage.getItem("user");

      if (!storedToken || !storedUser) {
        setIsLoading(false);
        return;
      }

      if (!isTokenExpired(storedToken)) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
        setIsLoading(false);
        return;
      }

      if (storedRefresh) {
        try {
          const { data } = await refreshMutation({
            variables: { token: storedRefresh },
          });
          if (data?.refreshToken.token) {
            const newToken = data.refreshToken.token;
            localStorage.setItem("auth_token", newToken);
            setToken(newToken);

            const { data: meData } = await fetchMe();
            if (meData?.me) {
              localStorage.setItem("user", JSON.stringify(meData.me));
              setUser(meData.me);
            } else {
              setUser(JSON.parse(storedUser));
            }
            setIsLoading(false);
            return;
          }
        } catch {
          // refresh failed
        }
      }

      clearAuth();
      setIsLoading(false);
    };

    initAuth();
  }, [refreshMutation, fetchMe, clearAuth]);

  const login = useCallback(
    async (email: string, password: string): Promise<UserProfile> => {
      const { data } = await loginMutation({
        variables: { input: { email, password } },
      });
      if (!data?.login) throw new Error("Login failed");

      const { token: authToken, refreshToken, user: userData } = data.login;
      storeAuth(authToken, refreshToken, userData);
      return userData;
    },
    [loginMutation, storeAuth]
  );

  const logout = useCallback(() => {
    clearAuth();
  }, [clearAuth]);

  const updateUser = useCallback((updatedUser: UserProfile) => {
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        isAuthenticated: !!user && !!token,
        login,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
