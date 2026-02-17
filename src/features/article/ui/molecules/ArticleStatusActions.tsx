import Link from "next/link";
import { Button } from "@/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu";
import { MoreHorizontal, Eye, Pencil, Send, Trash2, RotateCcw, MessageSquare } from "lucide-react";
import { ArticleStatus } from "@/types/enums";
import type { Article } from "@/types/common";

interface ArticleStatusActionsProps {
  article: Article;
  onSubmit?: (id: number) => void;
  onResubmit?: (id: number) => void;
  onDelete?: (id: number) => void;
  onViewFeedback?: (article: Article) => void;
}

export function ArticleStatusActions({
  article,
  onSubmit,
  onResubmit,
  onDelete,
  onViewFeedback,
}: ArticleStatusActionsProps) {
  const status = article.status.toUpperCase();

  // For PENDING and APPROVED, only allow viewing
  if (status === ArticleStatus.PENDING) {
    return (
      <div className="flex items-center gap-2">
        <Link href={`/author/articles/${article.id}`}>
          <Button
            size="sm"
            variant="outline"
            className="h-8 px-3 text-xs font-medium shadow-sm"
          >
            <Eye className="mr-1.5 h-3.5 w-3.5" />
            View
          </Button>
        </Link>
        <span className="text-xs text-muted-foreground">Under Review</span>
      </div>
    );
  }

  if (status === ArticleStatus.APPROVED) {
    return (
      <Link href={`/author/articles/${article.id}`}>
        <Button
          size="sm"
          variant="outline"
          className="h-8 px-3 text-xs font-medium shadow-sm"
        >
          <Eye className="mr-1.5 h-3.5 w-3.5" />
          View
        </Button>
      </Link>
    );
  }

  // For DRAFT: Edit, Delete, Submit for Review
  if (status === ArticleStatus.DRAFT) {
    return (
      <div className="flex items-center gap-2">
        <Link href={`/author/articles/${article.id}/edit`}>
          <Button
            size="sm"
            variant="outline"
            className="h-8 px-3 text-xs font-medium shadow-sm"
          >
            <Pencil className="mr-1.5 h-3.5 w-3.5" />
            Edit
          </Button>
        </Link>
        {onSubmit && (
          <Button
            onClick={() => onSubmit(article.id)}
            size="sm"
            className="h-8 px-3 text-xs font-medium shadow-sm transition-all hover:shadow-md bg-secondary text-secondary-foreground"
          >
            <Send className="mr-1.5 h-3.5 w-3.5" />
            Submit
          </Button>
        )}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 hover:bg-primary/10"
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            {onDelete && (
              <DropdownMenuItem
                onClick={() => onDelete(article.id)}
                className="text-destructive focus:bg-destructive/10 focus:text-destructive"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }

  // For REJECTED: View Feedback, Resubmit, Edit
  if (status === ArticleStatus.REJECTED) {
    return (
      <div className="flex items-center gap-2">
        {onViewFeedback && (
          <Button
            onClick={() => onViewFeedback(article)}
            size="sm"
            variant="outline"
            className="h-8 px-3 text-xs font-medium shadow-sm border-destructive/30 text-destructive hover:bg-destructive/10"
          >
            <MessageSquare className="mr-1.5 h-3.5 w-3.5" />
            Feedback
          </Button>
        )}
        <Link href={`/author/articles/${article.id}/edit`}>
          <Button
            size="sm"
            variant="outline"
            className="h-8 px-3 text-xs font-medium shadow-sm"
          >
            <Pencil className="mr-1.5 h-3.5 w-3.5" />
            Edit
          </Button>
        </Link>
        {onResubmit && (
          <Button
            onClick={() => onResubmit(article.id)}
            size="sm"
            className="h-8 px-3 text-xs font-medium shadow-sm transition-all hover:shadow-md bg-secondary text-secondary-foreground"
          >
            <RotateCcw className="mr-1.5 h-3.5 w-3.5" />
            Resubmit
          </Button>
        )}
      </div>
    );
  }

  // Default fallback
  return (
    <Link href={`/author/articles/${article.id}`}>
      <Button
        size="sm"
        variant="outline"
        className="h-8 px-3 text-xs font-medium shadow-sm"
      >
        <Eye className="mr-1.5 h-3.5 w-3.5" />
        View
      </Button>
    </Link>
  );
}
