"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/ui/alert-dialog";

interface ArticleDeleteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export function ArticleDeleteDialog({
  open,
  onOpenChange,
  onConfirm,
}: ArticleDeleteDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="sm:max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle style={{ color: 'hsl(var(--color-destructive))' }}>
            Delete Article
          </AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this article? This action cannot
            be undone and all data will be permanently removed.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            style={{
              borderColor: 'hsl(var(--color-border))',
              color: 'hsl(var(--color-foreground))'
            }}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="shadow-sm"
            style={{
              backgroundColor: 'hsl(var(--color-destructive))',
              color: 'white'
            }}
          >
            Delete Article
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
