import Image from "next/image";
import type { Article } from "@/types/common";
import { SECTIONS, SUBSECTIONS } from "@/types/enums";
import { formatDate, estimateReadTime } from "@/lib/utils";

interface PublicArticleHeroProps {
  article: Article;
}

export function PublicArticleHero({ article }: PublicArticleHeroProps) {
  const img =
    article.cover_image ??
    `https://picsum.photos/seed/${article.id}/1600/900`;

  const sectionMeta = SECTIONS[article.section as keyof typeof SECTIONS];
  const firstSub = article.subsections?.at(0);
  const badgeLabel = firstSub
    ? (SUBSECTIONS[firstSub]?.label ?? firstSub)
    : (sectionMeta?.label ?? article.section);

  const date = formatDate(article.published_at ?? article.created_at);
  const readTime = estimateReadTime(article.content);

  return (
    <header className="relative w-full h-[60vh] min-h-[40vh] overflow-hidden">
      <Image
        src={img}
        alt={article.title}
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      {/* Bottom-up gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end pb-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col gap-4">
            <span className="inline-block bg-forest-green text-white text-xs font-bold uppercase tracking-widest px-3 py-1 self-start rounded">
              {badgeLabel}
            </span>
            <h1 className="font-display text-4xl md:text-6xl text-white leading-tight font-bold max-w-4xl">
              {article.title}
            </h1>
            <div className="flex items-center gap-6 text-slate-200 text-sm mt-4">
              <span>{date}</span>
              <span>{readTime}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
