import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/types/common";

interface ArticleListCardProps {
  article: Article;
}

export function ArticleListCard({ article }: ArticleListCardProps) {
  const img =
    article.cover_image ??
    `https://picsum.photos/seed/${article.id}/300/200`;
  const tag = article.subsections?.at(0) ?? article.section;

  return (
    <Link
      href={`/articles/${article.id}`}
      data-cy="article-list-card"
      className="flex gap-4 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm group cursor-pointer hover:border-slate-200 transition-colors"
    >
      <div className="relative w-32 h-24 md:w-36 md:h-24 shrink-0 rounded-xl overflow-hidden">
        <Image
          src={img}
          alt={article.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="160px"
        />
      </div>
      <div className="flex flex-col justify-between py-1 min-w-0">
        <h3 className="font-bold text-base leading-snug group-hover:text-slate-blue transition-colors line-clamp-2">
          {article.title}
        </h3>
        <div className="mt-2">
          <span className="bg-slate-100 text-slate-500 px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider">
            {tag.replace(/_/g, " ")}
          </span>
        </div>
      </div>
    </Link>
  );
}
