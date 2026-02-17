import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/ui/badge";
import { SECTIONS } from "@/types/enums";
import type { LatestStoryCardProps } from "@/types/public";

export function LatestStoryCard({ article }: LatestStoryCardProps) {
  const section = SECTIONS[article.section as keyof typeof SECTIONS];
  const sectionLabel = section?.label ?? article.section;

  return (
    <Link
      href={`/articles/${article.id}`}
      className="flex gap-4 group cursor-pointer items-start"
    >
      <div className="w-20 h-24 shrink-0 rounded-lg overflow-hidden bg-slate-100 relative">
        {article.cover_image ? (
          <Image
            src={article.cover_image}
            alt={article.title}
            fill
            className="object-cover"
            sizes="80px"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-primary-soft" />
        )}
      </div>

      <div className="flex-grow pt-1">
        <h4 className="text-[13px] font-bold text-slate-900 leading-snug group-hover:text-primary transition-colors mb-2 line-clamp-3">
          {article.title}
        </h4>
        <Badge
          variant="outline"
          className="text-[9px] font-bold text-slate-500 border-slate-200 tracking-wider uppercase rounded-full px-2 py-0.5"
        >
          {sectionLabel}
        </Badge>
      </div>
    </Link>
  );
}
