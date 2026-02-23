import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/types/common";
import { SECTIONS } from "@/types/enums";
import { formatDate } from "@/lib/utils";

interface SearchResultCardProps {
  article: Article;
  onSelect?: () => void;
}

export function SearchResultCard({ article, onSelect }: SearchResultCardProps) {
  const section = SECTIONS[article.section as keyof typeof SECTIONS];
  const sectionLabel = section?.label ?? article.section;
  const img =
    article.cover_image ??
    `https://picsum.photos/seed/${article.id}/80/96`;

  return (
    <Link
      href={`/articles/${article.id}`}
      onClick={onSelect}
      data-cy="search-result-card"
      className="flex gap-4 group items-start py-3 border-b border-slate-100 last:border-0 hover:bg-slate-50 px-2 rounded-xl transition-colors"
    >
      <div className="shrink-0 rounded-lg overflow-hidden bg-slate-100">
        <Image
          src={img}
          alt={article.title}
          width={64}
          height={80}
          className="object-cover w-16 h-20"
        />
      </div>
      <div className="flex flex-col justify-between min-w-0 flex-grow">
        <h4 className="font-display text-sm font-bold text-slate-900 leading-snug group-hover:text-primary transition-colors line-clamp-2">
          {article.title}
        </h4>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider border border-slate-200 rounded-full px-2 py-0.5">
            {sectionLabel}
          </span>
          <span className="text-xs text-slate-400">
            {formatDate(article.published_at ?? article.created_at)}
          </span>
        </div>
      </div>
    </Link>
  );
}
