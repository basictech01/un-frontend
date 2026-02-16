import Link from "next/link";
import { TableCell, TableRow } from "@/ui/table";
import { Button } from "@/ui/button";
import { Checkbox } from "@/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu";
import { MoreHorizontal, Eye, Pencil, CheckCircle, XCircle, Trash2 } from "lucide-react";
import { StatusBadge } from "./StatusBadge";
import { SectionBadge } from "./SectionBadge";
import { formatDate } from "@/lib/utils";
import { ArticleStatus } from "@/types/enums";
import type { Article } from "@/types/common";

interface ArticleTableRowProps {
  article: Article;
  showCheckbox?: boolean;
  isSelected?: boolean;
  onSelect?: (checked: boolean) => void;
  onApprove?: (id: number) => void;
  onReject?: (id: number) => void;
  onDelete?: (id: number) => void;
}

export function ArticleTableRow({
  article,
  showCheckbox = false,
  isSelected = false,
  onSelect,
  onApprove,
  onReject,
  onDelete,
}: ArticleTableRowProps) {
  return (
    <TableRow className="group transition-all hover:bg-primary/8 hover:shadow-sm">
      {showCheckbox && (
        <TableCell>
          <Checkbox
            checked={isSelected}
            onCheckedChange={onSelect}
            aria-label={`Select ${article.title}`}
          />
        </TableCell>
      )}
      <TableCell>
        <div className="flex items-center gap-3">
          {article.cover_image && (
            <img
              src={article.cover_image}
              alt=""
              className="h-10 w-14 rounded object-cover shadow-sm transition-shadow group-hover:shadow-md"
            />
          )}
          <div className="min-w-0">
            <Link
              href={`/admin/articles/${article.id}`}
              className="font-medium text-foreground transition-all hover:text-primary hover:underline"
            >
              {article.title}
            </Link>
            {article.author && (
              <p className="text-xs text-muted-foreground">
                by {article.author.name}
              </p>
            )}
          </div>
        </div>
      </TableCell>
      <TableCell>
        <SectionBadge section={article.section} />
      </TableCell>
      <TableCell>
        <StatusBadge status={article.status} />
      </TableCell>
      <TableCell className="text-sm text-muted-foreground">
        {formatDate(article.created_at)}
      </TableCell>
      <TableCell>
        {(article.status === ArticleStatus.PENDING || article.status.toUpperCase() === "PENDING") && (onApprove || onReject) && (
          <div className="flex items-center gap-2">
            {onApprove && (
              <Button
                onClick={() => onApprove(article.id)}
                size="sm"
                className="h-8 px-3 text-xs font-medium shadow-sm transition-all hover:shadow-md"
                style={{
                  backgroundColor: 'hsl(var(--color-secondary))',
                  color: 'white'
                }}
              >
                <CheckCircle className="mr-1.5 h-3.5 w-3.5" />
                Approve
              </Button>
            )}
            {onReject && (
              <Button
                onClick={() => onReject(article.id)}
                size="sm"
                className="h-8 px-3 text-xs font-medium shadow-sm transition-all hover:shadow-md"
                style={{
                  backgroundColor: 'hsl(var(--color-destructive))',
                  color: 'white'
                }}
              >
                <XCircle className="mr-1.5 h-3.5 w-3.5" />
                Reject
              </Button>
            )}
          </div>
        )}
      </TableCell>
      <TableCell className="text-center">
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
            <DropdownMenuItem asChild>
              <Link href={`/admin/articles/${article.id}`}>
                <Eye className="mr-2 h-4 w-4" />
                View Article
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/admin/articles/${article.id}/edit`}>
                <Pencil className="mr-2 h-4 w-4" />
                Edit Article
              </Link>
            </DropdownMenuItem>
            {article.status === ArticleStatus.PENDING && onApprove && (
              <DropdownMenuItem
                onClick={() => onApprove(article.id)}
                style={{
                  color: 'hsl(var(--color-secondary))',
                  fontWeight: '500'
                }}
              >
                <CheckCircle className="mr-2 h-4 w-4" />
                Approve Article
              </DropdownMenuItem>
            )}
            {article.status === ArticleStatus.PENDING && onReject && (
              <DropdownMenuItem
                onClick={() => onReject(article.id)}
                style={{
                  color: 'hsl(var(--color-destructive))',
                  fontWeight: '500'
                }}
              >
                <XCircle className="mr-2 h-4 w-4" />
                Reject Article
              </DropdownMenuItem>
            )}
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
      </TableCell>
    </TableRow>
  );
}
