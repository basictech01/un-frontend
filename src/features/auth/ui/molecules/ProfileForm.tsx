"use client";

import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import { Textarea } from "@/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import { Loader2 } from "lucide-react";

interface ProfileFormProps {
  formData: {
    name: string;
    bio: string;
    profession: string;
    profile_photo: string;
  };
  onChange: (field: string, value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export function ProfileForm({
  formData,
  onChange,
  onSubmit,
  isLoading,
}: ProfileFormProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Profile</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => onChange("name", e.target.value)}
            disabled={isLoading}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            value={formData.bio}
            onChange={(e) => onChange("bio", e.target.value)}
            rows={4}
            disabled={isLoading}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="profession">Profession</Label>
          <Input
            id="profession"
            value={formData.profession}
            onChange={(e) => onChange("profession", e.target.value)}
            disabled={isLoading}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="profile_photo">Profile Photo URL</Label>
          <Input
            id="profile_photo"
            value={formData.profile_photo}
            onChange={(e) => onChange("profile_photo", e.target.value)}
            placeholder="https://example.com/photo.jpg"
            disabled={isLoading}
          />
        </div>
        <Button onClick={onSubmit} disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            "Save Changes"
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
