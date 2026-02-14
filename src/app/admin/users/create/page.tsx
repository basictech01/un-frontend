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
        <CardContent className="space-y-6 pt-6">
          <UserForm formData={formData} onChange={handleChange} />

          {/* Action Buttons */}
          <div className="border-t border-border pt-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={handleReset}
                className="w-full border-border text-muted-foreground sm:w-auto"
                disabled={isLoading}
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Reset Form
              </Button>

              <Button
                onClick={handleSubmit}
                disabled={isLoading}
                className="w-full bg-secondary text-secondary-foreground shadow-md transition-all hover:shadow-lg sm:w-auto"
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
        </CardContent>
      </Card>
    </div>
  );
}
