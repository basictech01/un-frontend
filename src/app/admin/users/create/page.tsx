"use client";

import { Button } from "@/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import { ArrowLeft, Loader2, UserPlus, RotateCcw } from "lucide-react";
import Link from "next/link";
import { UserForm } from "@/features/user/ui/molecules/UserForm";
import { useCreateUser } from "@/features/user/hooks/useCreateUser";

export default function CreateUserPage() {
  const { formData, handleChange, handleSubmit, isLoading } = useCreateUser();

  const handleReset = () => {
    window.location.reload();
  };

  return (
    <div className="space-y-6 pb-24">
      {/* Header with gradient */}
      <div
        className="rounded-lg border p-6 shadow-sm"
        style={{
          borderColor: 'hsl(var(--color-secondary) / 0.2)',
          background: 'linear-gradient(135deg, hsl(var(--color-secondary) / 0.05) 0%, hsl(var(--color-secondary) / 0.1) 50%, hsl(var(--color-primary) / 0.05) 100%)'
        }}
      >
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            asChild
            className="rounded-full"
            style={{
              backgroundColor: 'hsl(var(--color-card))',
              color: 'hsl(var(--color-secondary))'
            }}
          >
            <Link href="/admin/users">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight" style={{ color: 'hsl(var(--color-foreground))' }}>
              Create New User
            </h1>
            <p className="mt-1 text-sm" style={{ color: 'hsl(var(--color-muted-foreground))' }}>
              Add a new user account with role and permissions
            </p>
          </div>
        </div>
      </div>

      <Card className="relative shadow-sm" style={{ borderColor: 'hsl(var(--color-border))' }}>
        <CardHeader
          className="border-b"
          style={{
            borderColor: 'hsl(var(--color-border))',
            background: 'linear-gradient(135deg, hsl(var(--color-secondary) / 0.03) 0%, hsl(var(--color-secondary) / 0.05) 100%)'
          }}
        >
          <CardTitle style={{ color: 'hsl(var(--color-secondary))' }}>User Details</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <UserForm formData={formData} onChange={handleChange} />
        </CardContent>

        {/* Sticky Bottom Action Bar */}
        <div
          className="sticky bottom-0 -mx-6 -mb-6 mt-8 border-t px-6 py-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]"
          style={{
            backgroundColor: 'hsl(var(--color-card))',
            borderColor: 'hsl(var(--color-border))'
          }}
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={handleReset}
              className="order-2 sm:order-1"
              disabled={isLoading}
              style={{
                borderColor: 'hsl(var(--color-border))',
                color: 'hsl(var(--color-muted-foreground))'
              }}
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset Form
            </Button>

            <Button
              onClick={handleSubmit}
              disabled={isLoading}
              className="order-1 shadow-md transition-all hover:shadow-lg sm:order-2"
              style={{
                backgroundColor: 'hsl(var(--color-secondary))',
                color: 'white'
              }}
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
