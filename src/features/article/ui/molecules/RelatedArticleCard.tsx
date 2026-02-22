import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/types/common";
import { estimateReadTime } from "@/lib/utils";

interface RelatedArticleCardProps {
  article: Article;
}

export function RelatedArticleCard({ article }: RelatedArticleCardProps) {
  const img =
    article.cover_image ??
    `https://picsum.photos/seed/${article.id}/160/160`;
  const readTime = estimateReadTime(article.content);

  return (
    <Link href={`/articles/${article.id}`} className="flex gap-4 group">
      <div className="relative w-20 h-20 shrink-0 rounded-lg overflow-hidden">
        <Image
          src={img}
          alt={article.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
          sizes="80px"
        />
      </div>
      <div>
        <h4 className="text-sm font-bold text-slate-900 leading-snug group-hover:text-slate-blue transition-colors line-clamp-2">
          {article.title}
        </h4>
        <p className="text-xs text-slate-500 uppercase tracking-widest mt-1">
          {readTime}
        </p>
      </div>
    </Link>
  );
}
