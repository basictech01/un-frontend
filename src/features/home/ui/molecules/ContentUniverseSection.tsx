import { Separator } from "@/ui/separator";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { SECTIONS } from "@/types/enums";
import type { ContentUniverseSectionProps } from "@/types/public";
import { SectionCard } from "./SectionCard";

export function ContentUniverseSection({
  articlesBySection,
  loading,
}: ContentUniverseSectionProps) {
  if (loading) {
    return (
      <SkeletonTheme baseColor="#e2e8f0" highlightColor="#f8fafc">
        <div>
          <div className="flex items-center mb-10 gap-6">
            <Skeleton width={192} height={32} borderRadius={6} />
            <Separator className="flex-grow bg-slate-200" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="border border-slate-100 rounded-3xl overflow-hidden">
                <Skeleton height={200} style={{ display: "block", lineHeight: "unset" }} borderRadius={0} />
                <div className="p-6 space-y-3">
                  <Skeleton width={96} height={12} />
                  <Skeleton height={22} />
                  <Skeleton width="80%" height={16} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </SkeletonTheme>
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
