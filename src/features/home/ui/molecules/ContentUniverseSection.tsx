import { Skeleton } from "@/ui/skeleton";
import { Separator } from "@/ui/separator";
import { SECTIONS } from "@/types/enums";
import type { ContentUniverseSectionProps } from "@/types/public";
import { SectionCard } from "./SectionCard";

export function ContentUniverseSection({
  articlesBySection,
  loading,
}: ContentUniverseSectionProps) {
  if (loading) {
    return (
      <div>
        <div className="flex items-center mb-10">
          <Skeleton className="h-8 w-48 bg-slate-200 shrink-0" />
          <Separator className="flex-grow ml-6 bg-slate-200" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="border border-slate-100 rounded-3xl overflow-hidden"
            >
              <Skeleton className="aspect-[16/10] w-full rounded-none bg-slate-200" />
              <div className="p-6 space-y-3">
                <Skeleton className="h-3 w-24 bg-slate-200" />
                <Skeleton className="h-5 w-full bg-slate-200" />
                <Skeleton className="h-4 w-4/5 bg-slate-200" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <h3 className="text-3xl font-display font-bold text-slate-900 tracking-tight whitespace-nowrap">
          Content Universes
        </h3>
        <Separator className="flex-grow mx-6 bg-slate-200" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {Object.keys(SECTIONS).map((key) => (
          <SectionCard
            key={key}
            sectionKey={key}
            article={articlesBySection[key]}
          />
        ))}
      </div>
    </div>
  );
}
