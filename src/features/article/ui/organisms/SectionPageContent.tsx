"use client";

import { useMemo, useRef, useEffect, useState } from "react";
import {
  SECTIONS,
  SUBSECTIONS,
  getSubsectionsForSection,
  slugToSectionKey,
} from "@/types/enums";
import { UNLoader } from "@/components/organisms";
import { useSectionArticles } from "../../hooks/useSectionArticles";
import { SectionHeroBanner } from "../molecules/SectionHeroBanner";
import { SectionHeading } from "../molecules/SectionHeading";
import { FeaturedArticleGrid } from "../molecules/FeaturedArticleGrid";
import { ArticleListCard } from "../molecules/ArticleListCard";
import { ArticleGridCard } from "../molecules/ArticleGridCard";
import type { Article } from "@/types/common";

const MORE_STORIES_PAGE = 6;

interface SectionPageContentProps {
  /** URL slug, e.g. "voices_and_visionaries" */
  sectionKey: string;
}

export function SectionPageContent({ sectionKey }: SectionPageContentProps) {
  const canonicalKey = slugToSectionKey(sectionKey);
  const sectionMeta = canonicalKey ? SECTIONS[canonicalKey] : null;

  const { articles, loading, hasNextPage, loadingMore, loadMore } =
    useSectionArticles(canonicalKey ?? "");

  const subsectionKeys = canonicalKey
    ? getSubsectionsForSection(canonicalKey)
    : [];

  // Group articles by subsection key
  const articlesBySubsection = useMemo(() => {
    const map: Record<string, Article[]> = {};
    for (const sub of subsectionKeys) {
      map[sub] = [];
    }
    for (const article of articles) {
      for (const sub of article.subsections ?? []) {
        if (map[sub]) {
          map[sub].push(article);
        }
      }
    }
    return map;
  }, [articles, subsectionKeys]);

  // Articles not placed in any subsection bucket → "More Stories"
  const subsectionArticleIds = useMemo(() => {
    const ids = new Set<number>();
    for (const sub of subsectionKeys) {
      for (const a of articlesBySubsection[sub] ?? []) {
        ids.add(a.id);
      }
    }
    return ids;
  }, [articlesBySubsection, subsectionKeys]);

  const remainingArticles = useMemo(
    () => articles.filter((a) => !subsectionArticleIds.has(a.id)),
    [articles, subsectionArticleIds]
  );

  // How many "More Stories" cards are visible (client-side page)
  const [visibleCount, setVisibleCount] = useState(MORE_STORIES_PAGE);
  const sentinelRef = useRef<HTMLDivElement>(null);

  // Reset visible count when section changes
  useEffect(() => {
    setVisibleCount(MORE_STORIES_PAGE);
  }, [sectionKey]);

  // IntersectionObserver: load more when sentinel enters view
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        if (visibleCount < remainingArticles.length) {
          // More cached articles available — just show them
          setVisibleCount((c) => c + MORE_STORIES_PAGE);
        } else if (hasNextPage && !loadingMore) {
          // Need server-side page
          loadMore();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [visibleCount, remainingArticles.length, hasNextPage, loadingMore, loadMore]);

  const visibleRemaining = remainingArticles.slice(0, visibleCount);
  const hasMoreStories =
    remainingArticles.length > 0 || hasNextPage || loading;

  const [featuredSubKey, ...listSubKeys] = subsectionKeys;
  const leftSubKeys = listSubKeys.filter((_, i) => i % 2 === 0);
  const rightSubKeys = listSubKeys.filter((_, i) => i % 2 === 1);

  if (!sectionMeta) {
    return (
      <div className="text-center py-20 text-slate-500">
        Section not found.
      </div>
    );
  }

  const heroCoverImage = articles.at(0)?.cover_image ?? null;

  return (
    <>
      {/* ── Hero Banner ─────────────────────────────── */}
      {loading ? (
        <div className="h-[300px] rounded-3xl mb-16 bg-slate-200 flex items-center justify-center">
          <UNLoader />
        </div>
      ) : (
        <SectionHeroBanner
          label={sectionMeta.label}
          tagline={sectionMeta.tagline}
          coverImage={heroCoverImage}
        />
      )}

      {/* ── Featured subsection (big grid) ─────────── */}
      {featuredSubKey && (
        <section className="mb-20">
          <SectionHeading
            label={SUBSECTIONS[featuredSubKey]?.label ?? featuredSubKey}
            tagline={SUBSECTIONS[featuredSubKey]?.tagline}
            size="lg"
          />
          {loading ? (
            <div className="flex items-center justify-center h-96">
              <UNLoader />
            </div>
          ) : (
            <FeaturedArticleGrid
              articles={articlesBySubsection[featuredSubKey] ?? []}
            />
          )}
        </section>
      )}

      {/* ── Remaining subsections (two-col list) ────── */}
      {(leftSubKeys.length > 0 || rightSubKeys.length > 0) && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <div className="space-y-12">
            {leftSubKeys.map((subKey) => (
              <div key={subKey}>
                <SectionHeading
                  label={SUBSECTIONS[subKey]?.label ?? subKey}
                  tagline={SUBSECTIONS[subKey]?.tagline}
                />
                {loading ? (
                  <div className="flex items-center justify-center py-8">
                    <UNLoader />
                  </div>
                ) : (
                  <div className="space-y-4">
                    {(articlesBySubsection[subKey] ?? []).map((article) => (
                      <ArticleListCard key={article.id} article={article} />
                    ))}
                    {(articlesBySubsection[subKey] ?? []).length === 0 && (
                      <p className="text-sm text-slate-400 italic">
                        No articles yet.
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="space-y-12">
            {rightSubKeys.map((subKey) => (
              <div key={subKey}>
                <SectionHeading
                  label={SUBSECTIONS[subKey]?.label ?? subKey}
                  tagline={SUBSECTIONS[subKey]?.tagline}
                />
                {loading ? (
                  <div className="flex items-center justify-center py-8">
                    <UNLoader />
                  </div>
                ) : (
                  <div className="space-y-4">
                    {(articlesBySubsection[subKey] ?? []).map((article) => (
                      <ArticleListCard key={article.id} article={article} />
                    ))}
                    {(articlesBySubsection[subKey] ?? []).length === 0 && (
                      <p className="text-sm text-slate-400 italic">
                        No articles yet.
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── More Stories — infinite scroll grid ─────── */}
      {hasMoreStories && (
        <section className="mt-4">
          <SectionHeading label="More Stories" />
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <UNLoader />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {visibleRemaining.map((article) => (
                  <ArticleGridCard key={article.id} article={article} />
                ))}
              </div>

              {/* Sentinel — observed to trigger next page */}
              <div ref={sentinelRef} className="h-1" />

              {/* Spinner shown while fetching next server page */}
              {loadingMore && (
                <div className="flex justify-center py-10">
                  <UNLoader />
                </div>
              )}
            </>
          )}
        </section>
      )}
    </>
  );
}
