import Image from "next/image";
import Link from "next/link";
import {
  Users,
  GraduationCap,
  TrendingUp,
  Scale,
  Leaf,
  BookOpen,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SECTIONS } from "@/types/enums";
import type { SectionCardProps } from "@/types/public";

const SECTION_CONFIG: Record<
  string,
  { labelClass: string; Icon: LucideIcon }
> = {
  VOICES_AND_VISIONARIES: {
    labelClass: "text-forest-green",
    Icon: Users,
  },
  NATURE_AND_NURTURE: {
    labelClass: "text-forest-green",
    Icon: Leaf,
  },
  SPIRIT_AND_STORY: {
    labelClass: "text-slate-blue",
    Icon: BookOpen,
  },
  GROWTH_AND_GRIT: {
    labelClass: "text-slate-blue",
    Icon: TrendingUp,
  },
  LEARNING_AND_LADDERS: {
    labelClass: "text-slate-500",
    Icon: GraduationCap,
  },
  STATE_AND_STEWARDSHIP: {
    labelClass: "text-slate-500",
    Icon: Scale,
  },
};

export function SectionCard({ sectionKey, article }: SectionCardProps) {
  const section = SECTIONS[sectionKey as keyof typeof SECTIONS];
  if (!section) return null;

  const config = SECTION_CONFIG[sectionKey] ?? {
    labelClass: "text-slate-500",
    Icon: BookOpen,
  };
  const { labelClass, Icon } = config;
  const href = article ? `/articles/${article.id}` : `/section/${sectionKey.toLowerCase()}`;
  const title = article?.title ?? section.tagline;
  const excerpt =
    article?.excerpt ??
    `Explore stories from Uttarakhand's ${section.label}.`;

  return (
    <Link
      href={href}
      data-cy="section-card"
      className="universe-card-hover group border border-slate-100 rounded-3xl overflow-hidden bg-white block"
    >
      <div className="aspect-[16/10] overflow-hidden bg-slate-100 relative">
        <Image
          src={article?.cover_image ?? `https://picsum.photos/seed/${sectionKey}/800/500`}
          alt={section.label}
          fill
          className="object-cover transition-all duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span
            className={`text-xs font-black uppercase tracking-[0.2em] ${labelClass}`}
          >
            {section.label}
          </span>
          <Icon className="w-4 h-4 text-slate-300" strokeWidth={1.5} />
        </div>
        <h4 className="font-display text-xl font-bold mb-2 text-slate-900 group-hover:text-primary transition-colors line-clamp-2">
          {title}
        </h4>
        <p className="text-sm text-slate-500 line-clamp-2">{excerpt}</p>
      </div>
    </Link>
  );
}
