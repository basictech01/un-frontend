import Image from "next/image";
import { StatusBadge } from "./StatusBadge";
import { SectionBadge } from "./SectionBadge";
import { formatDate, formatSubsectionLabel } from "@/lib/utils";
import { Badge } from "@/ui/badge";
import type { Article } from "@/types/common";

interface ArticleDetailHeaderProps {
  article: Article;
}

export function ArticleDetailHeader({
  article,
}: ArticleDetailHeaderProps) {
  return (
    <div className="space-y-4">
      {article.cover_image && (
        <div className="relative h-64 w-full overflow-hidden rounded-lg">
          <Image
            src={article.cover_image}
            alt={article.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">{article.title}</h1>
        {article.excerpt && (
          <p className="text-lg text-muted-foreground">{article.excerpt}</p>
        )}
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <SectionBadge section={article.section} />
        <StatusBadge status={article.status} />
        {article.subsections?.map((sub: string) => (
          <Badge key={sub} variant="outline">
            {formatSubsectionLabel(sub)}
          </Badge>
        ))}
      </div>
      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
        <span>Created: {formatDate(article.created_at)}</span>
        <span>Updated: {formatDate(article.updated_at)}</span>
        {article.published_at && (
          <span>Published: {formatDate(article.published_at)}</span>
        )}
      </div>
      {article.rejection_reason && (
        <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          <strong>Rejection reason:</strong> {article.rejection_reason}
        </div>
      )}
    </div>
  );
}
