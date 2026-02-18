import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/ui/badge";
import { SECTIONS } from "@/types/enums";
import type { LatestStoryCardProps } from "@/types/public";
import { formatDate } from "@/lib/utils";

export function LatestStoryCard({ article }: LatestStoryCardProps) {
  const section = SECTIONS[article.section as keyof typeof SECTIONS];
  const sectionLabel = section?.label ?? article.section;

  return (
    <Link
      href={`/articles/${article.id}`}
      className="flex gap-4 group cursor-pointer items-start"
    >
      <div className="shrink-0 rounded-lg overflow-hidden bg-slate-100">
        <Image
          src={article.cover_image ?? `https://picsum.photos/seed/${article.id}/80/96`}
          alt={article.title}
          width={80}
          height={96}
          className="object-cover"
        />
      </div>

      <div className="flex-grow pt-1">
        <h4 className="text-sm font-bold text-slate-900 leading-snug group-hover:text-primary transition-colors mb-2 line-clamp-3">
          {article.title}
        </h4>
        <Badge
          variant="outline"
          className="text-xs font-bold text-slate-500 border-slate-200 tracking-wider uppercase rounded-full px-2 py-0.5"
        >
          {sectionLabel}
        </Badge>
        <span className="text-xs text-slate-400 mt-1 block">
          {formatDate(article.published_at ?? article.created_at)}
        </span>
      </div>
    </Link>
  );
}
