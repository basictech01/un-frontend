"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/ui/dialog";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import { Textarea } from "@/ui/textarea";
import { Loader2 } from "lucide-react";
import { useUpdateUser } from "../../hooks/useUpdateUser";
import type { UserProfile } from "@/types/common";

interface UpdateUserDialogProps {
  open: boolean;
  user: UserProfile | null;
  onOpenChange: (open: boolean) => void;
}

export function UpdateUserDialog({
  open,
  user,
  onOpenChange,
}: UpdateUserDialogProps) {
  const { handleUpdate, isLoading } = useUpdateUser();

  const [formData, setFormData] = useState({
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

  const handleSubmit = async () => {
    if (!user) return;
    await handleUpdate(user.id, {
      name: formData.name,
      bio: formData.bio || null,
      profession: formData.profession || null,
      profile_photo: formData.profile_photo || null,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="edit-name">Name</Label>
            <Input
              id="edit-name"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-bio">Bio</Label>
            <Textarea
              id="edit-bio"
              value={formData.bio}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, bio: e.target.value }))
              }
              rows={3}
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-profession">Profession</Label>
            <Input
              id="edit-profession"
              value={formData.profession}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  profession: e.target.value,
                }))
              }
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-photo">Profile Photo URL</Label>
            <Input
              id="edit-photo"
              value={formData.profile_photo}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  profile_photo: e.target.value,
                }))
              }
              disabled={isLoading}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
