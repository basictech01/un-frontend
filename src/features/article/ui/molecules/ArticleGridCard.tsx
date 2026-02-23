import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/types/common";

interface ArticleGridCardProps {
  article: Article;
}

export function ArticleGridCard({ article }: ArticleGridCardProps) {
  const img =
    article.cover_image ??
    `https://picsum.photos/seed/${article.id}/600/400`;
  const tag = article.subsections?.at(0) ?? article.section;

  return (
    <Link
      href={`/articles/${article.id}`}
      data-cy="article-grid-card"
      className="bg-white rounded-3xl overflow-hidden shadow-sm group cursor-pointer border border-slate-100 hover:border-slate-200 transition-colors block"
    >
      <div className="aspect-[16/10] overflow-hidden relative">
        <Image
          src={img}
          alt={article.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-6">
        <span className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3 block">
          {tag.replace(/_/g, " ")}
        </span>
        <h3 className="text-xl font-display font-bold mb-3 group-hover:text-slate-blue transition-colors line-clamp-2">
          {article.title}
        </h3>
        {article.excerpt && (
          <p className="text-sm text-slate-500 line-clamp-2">
            {article.excerpt}
          </p>
        )}
      </div>
    </Link>
  );
}
