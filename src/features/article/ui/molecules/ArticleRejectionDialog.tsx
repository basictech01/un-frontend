"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/ui/dialog";
import { Button } from "@/ui/button";
import { Textarea } from "@/ui/textarea";
import { Label } from "@/ui/label";

interface ArticleRejectionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (reason: string) => void;
}

export function ArticleRejectionDialog({
  open,
  onOpenChange,
  onConfirm,
}: ArticleRejectionDialogProps) {
  const [reason, setReason] = useState("");

  const handleConfirm = () => {
    if (!reason.trim()) return;
    onConfirm(reason.trim());
    setReason("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle style={{ color: 'hsl(var(--color-destructive))' }}>
            Reject Article
          </DialogTitle>
          <DialogDescription>
            Please provide a reason for rejecting this article. The author
            will be able to see this reason.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-2">
          <Label htmlFor="reason">Rejection Reason</Label>
          <Textarea
            id="reason"
            data-cy="rejection-reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Enter the reason for rejection..."
            rows={4}
            className="resize-none"
          />
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            style={{
              borderColor: 'hsl(var(--color-border))',
              color: 'hsl(var(--color-foreground))'
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={!reason.trim()}
            data-cy="rejection-submit"
            className="shadow-sm"
            style={{
              backgroundColor: 'hsl(var(--color-destructive))',
              color: 'white'
            }}
          >
            Reject Article
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
