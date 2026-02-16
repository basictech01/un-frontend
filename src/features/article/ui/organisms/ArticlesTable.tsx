"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/ui/table";
import { Skeleton } from "@/ui/skeleton";
import { Button } from "@/ui/button";
import { Checkbox } from "@/ui/checkbox";
import { CheckCircle, Trash2 } from "lucide-react";
import { ArticleTableRow } from "../molecules/ArticleTableRow";
import { ArticleRejectionDialog } from "../molecules/ArticleRejectionDialog";
import { ArticleDeleteDialog } from "../molecules/ArticleDeleteDialog";
import { useArticleActions } from "../../hooks/useArticleActions";
import { useDeleteArticle } from "../../hooks/useDeleteArticle";
import { useBulkArticleActions } from "../../hooks/useBulkArticleActions";
import type { Article } from "@/types/common";

interface ArticlesTableProps {
  articles: Article[];
  loading: boolean;
  showActions?: boolean;
  showBulkActions?: boolean;
}

export function ArticlesTable({
  articles,
  loading,
  showActions = true,
  showBulkActions = false,
}: ArticlesTableProps) {
  const { handleApprove, handleReject } = useArticleActions();
  const { handleDelete } = useDeleteArticle();
  const { handleBulkApprove, handleBulkDelete, loading: bulkLoading } =
    useBulkArticleActions();

  const [rejectDialog, setRejectDialog] = useState<{
    open: boolean;
    articleId: number | null;
  }>({ open: false, articleId: null });

  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean;
    articleId: number | null;
  }>({ open: false, articleId: null });

  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(articles.map((article) => article.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedIds((prev) => [...prev, id]);
    } else {
      setSelectedIds((prev) => prev.filter((selectedId) => selectedId !== id));
    }
  };

  const handleBulkApproveClick = async () => {
    await handleBulkApprove(selectedIds);
    setSelectedIds([]);
  };

  const handleBulkDeleteClick = async () => {
    await handleBulkDelete(selectedIds);
    setSelectedIds([]);
  };

  const allSelected = articles.length > 0 && selectedIds.length === articles.length;
  const someSelected = selectedIds.length > 0 && selectedIds.length < articles.length;

  if (loading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-16 w-full" />
        ))}
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="flex min-h-[200px] items-center justify-center rounded-md border border-dashed text-muted-foreground">
        No articles found
      </div>
    );
  }

  return (
    <>
      {showBulkActions && selectedIds.length > 0 && (
        <div className="mb-4 flex items-center gap-3 rounded-md border border-primary/20 bg-primary/5 p-4">
          <p className="text-sm font-medium">
            {selectedIds.length} article{selectedIds.length > 1 ? "s" : ""} selected
          </p>
          <div className="flex gap-2">
            <Button
              onClick={handleBulkApproveClick}
              disabled={bulkLoading}
              size="sm"
              className="bg-secondary hover:bg-secondary/90"
            >
              <CheckCircle className="mr-2 h-4 w-4" />
              Approve Selected
            </Button>
            <Button
              onClick={handleBulkDeleteClick}
              disabled={bulkLoading}
              size="sm"
              variant="destructive"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Selected
            </Button>
          </div>
        </div>
      )}

      <div className="overflow-hidden rounded-md border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              {showBulkActions && (
                <TableHead className="w-[50px]">
                  <Checkbox
                    checked={allSelected}
                    onCheckedChange={handleSelectAll}
                    aria-label="Select all articles"
                    className={someSelected ? "data-[state=checked]:bg-primary/50" : ""}
                  />
                </TableHead>
              )}
              <TableHead className="min-w-[300px]">Article</TableHead>
              <TableHead>Section</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="min-w-[180px]">Actions</TableHead>
              <TableHead className="w-[50px]" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {articles.map((article) => (
              <ArticleTableRow
                key={article.id}
                article={article}
                showCheckbox={showBulkActions}
                isSelected={selectedIds.includes(article.id)}
                onSelect={(checked) => handleSelectOne(article.id, checked)}
                onApprove={showActions ? handleApprove : undefined}
                onReject={
                  showActions
                    ? (id) => setRejectDialog({ open: true, articleId: id })
                    : undefined
                }
                onDelete={
                  showActions
                    ? (id) => setDeleteDialog({ open: true, articleId: id })
                    : undefined
                }
              />
            ))}
          </TableBody>
        </Table>
      </div>

      <ArticleRejectionDialog
        open={rejectDialog.open}
        onOpenChange={(open) =>
          !open && setRejectDialog({ open: false, articleId: null })
        }
        onConfirm={(reason) => {
          if (rejectDialog.articleId) {
            handleReject(rejectDialog.articleId, reason);
          }
          setRejectDialog({ open: false, articleId: null });
        }}
      />

      <ArticleDeleteDialog
        open={deleteDialog.open}
        onOpenChange={(open) =>
          !open && setDeleteDialog({ open: false, articleId: null })
        }
        onConfirm={() => {
          if (deleteDialog.articleId) {
            handleDelete(deleteDialog.articleId);
          }
          setDeleteDialog({ open: false, articleId: null });
        }}
      />
    </>
  );
}
