import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/types/common";

interface FeaturedArticleGridProps {
  articles: Article[];
}

function BigCard({ article }: { article: Article }) {
  const img =
    article.cover_image ??
    `https://picsum.photos/seed/${article.id}/800/600`;
  return (
    <Link
      href={`/articles/${article.id}`}
      className="lg:col-span-8 group cursor-pointer relative rounded-3xl overflow-hidden shadow-lg h-[400px] lg:h-full block"
    >
      <Image
        src={img}
        alt={article.title}
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-700"
        sizes="(max-width: 1024px) 100vw, 66vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-8">
        <span className="text-xs font-bold text-white/70 uppercase tracking-widest mb-2">
          Feature Story
        </span>
        <h3 className="text-3xl font-display font-bold text-white leading-tight line-clamp-2">
          {article.title}
        </h3>
        {article.excerpt && (
          <p className="text-slate-300 mt-4 max-w-xl line-clamp-2">
            {article.excerpt}
          </p>
        )}
      </div>
    </Link>
  );
}

function SmallCard({ article }: { article: Article }) {
  const img =
    article.cover_image ??
    `https://picsum.photos/seed/${article.id}/400/300`;
  return (
    <Link
      href={`/articles/${article.id}`}
      className="h-[288px] group cursor-pointer relative rounded-3xl overflow-hidden shadow-lg block"
    >
      <Image
        src={img}
        alt={article.title}
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-700"
        sizes="(max-width: 1024px) 50vw, 33vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
        <h4 className="text-xl font-display font-bold text-white leading-tight line-clamp-2">
          {article.title}
        </h4>
      </div>
    </Link>
  );
}

export function FeaturedArticleGrid({ articles }: FeaturedArticleGridProps) {
  const [big, ...rest] = articles;
  const smalls = rest.slice(0, 2);

  if (!big) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 h-auto lg:h-[600px]">
      <BigCard article={big} />
      {smalls.length > 0 && (
        <div className="lg:col-span-4 flex flex-col gap-6">
          {smalls.map((a) => (
            <SmallCard key={a.id} article={a} />
          ))}
        </div>
      )}
    </div>
  );
}
