"use client";

import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/select";
import { Switch } from "@/ui/switch";
import type { UserFormState } from "../../hooks/useCreateUser";

interface UserFormProps {
  formData: UserFormState;
  onChange: (field: keyof UserFormState, value: unknown) => void;
}

export function UserForm({ formData, onChange }: UserFormProps) {
  return (
    <div className="space-y-6">
      {/* Full Name */}
      <div className="space-y-2">
        <Label htmlFor="name">
          Full Name <span className="text-destructive">*</span>
        </Label>
        <Input
          id="name"
          placeholder="Enter user's full name"
          value={formData.name}
          onChange={(e) => onChange("name", e.target.value)}
          required
        />
      </div>

      {/* Email Address */}
      <div className="space-y-2">
        <Label htmlFor="email">
          Email Address <span className="text-destructive">*</span>
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="user@example.com"
          value={formData.email}
          onChange={(e) => onChange("email", e.target.value)}
          required
        />
        <p className="text-xs text-muted-foreground">
          A unique email address for this user account
        </p>
      </div>

      {/* Password */}
      <div className="space-y-2">
        <Label htmlFor="password">
          Password <span className="text-destructive">*</span>
        </Label>
        <Input
          id="password"
          type="password"
          placeholder="Enter a secure password"
          value={formData.password}
          onChange={(e) => onChange("password", e.target.value)}
          required
        />
        <p className="text-xs text-muted-foreground">
          Minimum 8 characters required
        </p>
      </div>

      {/* Role Selection */}
      <div className="space-y-2">
        <Label htmlFor="role">
          Role <span className="text-destructive">*</span>
        </Label>
        <Select
          value={formData.role}
          onValueChange={(value) => onChange("role", value)}
        >
          <SelectTrigger id="role">
            <SelectValue placeholder="Select a role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="AUTHOR">Author</SelectItem>
            <SelectItem value="ADMIN">Admin</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-xs text-muted-foreground">
          Authors can create articles, Admins have full access
        </p>
      </div>

      {/* Account Status */}
      <div className="flex items-center justify-between rounded-lg border p-4">
        <div className="space-y-0.5">
          <Label htmlFor="is_active" className="text-base">
            Account Status
          </Label>
          <p className="text-sm text-muted-foreground">
            {formData.is_active
              ? "Account is active and can log in"
              : "Account is disabled and cannot log in"}
          </p>
        </div>
        <Switch
          id="is_active"
          checked={formData.is_active}
          onCheckedChange={(checked) => onChange("is_active", checked)}
        />
      </div>
    </div>
  );
}
