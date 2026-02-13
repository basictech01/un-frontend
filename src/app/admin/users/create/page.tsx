"use client";

import { Button } from "@/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import { ArrowLeft, Loader2, UserPlus, RotateCcw } from "lucide-react";
import Link from "next/link";
import { UserForm } from "@/features/user/ui/molecules/UserForm";
import { useCreateUser } from "@/features/user/hooks/useCreateUser";

export default function CreateUserPage() {
  const { formData, handleChange, handleSubmit, handleReset, isLoading } = useCreateUser();

  return (
    <div className="space-y-6 pb-24">
      {/* Header with gradient */}
      <div className="rounded-lg border border-secondary/20 bg-gradient-secondary-soft p-6 shadow-sm">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            asChild
            className="rounded-full bg-card text-secondary"
          >
            <Link href="/admin/users">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Create New User
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Add a new user account with role and permissions
            </p>
          </div>
        </div>
      </div>

      <Card className="relative border-border shadow-sm">
        <CardHeader className="border-b border-border bg-gradient-secondary-subtle">
          <CardTitle className="text-secondary">User Details</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <UserForm formData={formData} onChange={handleChange} />
        </CardContent>

        {/* Sticky Bottom Action Bar */}
        <div className="sticky bottom-0 -mx-6 -mb-6 mt-8 border-t border-border bg-card px-6 py-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={handleReset}
              className="order-2 border-border text-muted-foreground sm:order-1"
              disabled={isLoading}
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset Form
            </Button>

            <Button
              onClick={handleSubmit}
              disabled={isLoading}
              className="order-1 bg-secondary text-white shadow-md transition-all hover:shadow-lg sm:order-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating User...
                </>
              ) : (
                <>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Create User
                </>
              )}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
