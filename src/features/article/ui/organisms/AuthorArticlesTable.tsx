"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/ui/table";
import { Skeleton } from "@/ui/skeleton";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/ui/dialog";
import { StatusBadge } from "../molecules/StatusBadge";
import { SectionBadge } from "../molecules/SectionBadge";
import { ArticleStatusActions } from "../molecules/ArticleStatusActions";
import { RejectionFeedbackCard } from "../molecules/RejectionFeedbackCard";
import { ArticleDeleteDialog } from "../molecules/ArticleDeleteDialog";
import { useSubmitArticle } from "../../hooks/useSubmitArticle";
import { useResubmitArticle } from "../../hooks/useResubmitArticle";
import { useDeleteArticle } from "../../hooks/useDeleteArticle";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import type { Article } from "@/types/common";

interface AuthorArticlesTableProps {
  articles: Article[];
  loading: boolean;
}

export function AuthorArticlesTable({
  articles,
  loading,
}: AuthorArticlesTableProps) {
  const { handleSubmit } = useSubmitArticle();
  const { handleResubmit } = useResubmitArticle();
  const { handleDelete } = useDeleteArticle();

  const [feedbackDialog, setFeedbackDialog] = useState<{
    open: boolean;
    article: Article | null;
  }>({ open: false, article: null });

  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean;
    articleId: number | null;
  }>({ open: false, articleId: null });

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
      <div className="overflow-hidden rounded-md border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="min-w-[300px]">Article</TableHead>
              <TableHead>Section</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="min-w-[200px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {articles.map((article) => (
              <TableRow
                key={article.id}
                className="group transition-all hover:bg-primary/8 hover:shadow-sm"
              >
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
                        href={`/author/articles/${article.id}`}
                        className="font-medium text-foreground transition-all hover:text-primary hover:underline"
                      >
                        {article.title}
                      </Link>
                      {article.excerpt && (
                        <p className="text-xs text-muted-foreground line-clamp-1">
                          {article.excerpt}
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
                  <ArticleStatusActions
                    article={article}
                    onSubmit={handleSubmit}
                    onResubmit={handleResubmit}
                    onDelete={(id) =>
                      setDeleteDialog({ open: true, articleId: id })
                    }
                    onViewFeedback={(article) =>
                      setFeedbackDialog({ open: true, article })
                    }
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog
        open={feedbackDialog.open}
        onOpenChange={(open) =>
          !open && setFeedbackDialog({ open: false, article: null })
        }
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Rejection Feedback</DialogTitle>
          </DialogHeader>
          {feedbackDialog.article && (
            <RejectionFeedbackCard
              reason={feedbackDialog.article.rejection_reason || "No reason provided"}
              rejectedAt={feedbackDialog.article.updated_at}
            />
          )}
        </DialogContent>
      </Dialog>

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
