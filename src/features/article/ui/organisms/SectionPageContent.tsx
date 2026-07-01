"use client";

import { useMemo, useRef, useEffect, useState } from "react";
import {
  SECTIONS,
  SECTION_BANNERS,
  SUBSECTIONS,
  getSubsectionsForSection,
  slugToSectionKey,
} from "@/types/enums";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useSectionArticles } from "../../hooks/useSectionArticles";
import { SectionHeroBanner } from "../molecules/SectionHeroBanner";
import { SectionHeading } from "../molecules/SectionHeading";
import { FeaturedArticleGrid } from "../molecules/FeaturedArticleGrid";
import { ArticleListCard } from "../molecules/ArticleListCard";
import { ArticleGridCard } from "../molecules/ArticleGridCard";
import type { Article } from "@/types/common";

const MORE_STORIES_PAGE = 6;
const FEATURED_LIMIT = 4; // Max articles shown in featured subsection grid
const LIST_LIMIT = 3;     // Max articles shown per list subsection

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

  // IDs of articles shown inside subsection buckets (capped) → rest go to "More Stories"
  const subsectionArticleIds = useMemo(() => {
    const ids = new Set<number>();
    subsectionKeys.forEach((sub, i) => {
      const limit = i === 0 ? FEATURED_LIMIT : LIST_LIMIT;
      for (const a of (articlesBySubsection[sub] ?? []).slice(0, limit)) {
        ids.add(a.id);
      }
    });
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

  if (loading) {
    return (
      <SkeletonTheme baseColor="#e2e8f0" highlightColor="#f8fafc">
        {/* Hero banner */}
        <div className="mb-16">
          <Skeleton height={300} borderRadius={24} style={{ display: "block", lineHeight: "unset" }} />
        </div>

        {/* Featured subsection */}
        <div className="mb-20">
          <Skeleton width={160} height={20} className="mb-2" />
          <Skeleton width={260} height={13} className="mb-8" />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-auto lg:h-[600px]">
            <div className="lg:col-span-8">
              <Skeleton height={400} borderRadius={24} style={{ display: "block", lineHeight: "unset" }} className="lg:!h-full" />
            </div>
            <div className="lg:col-span-4 flex flex-col gap-6">
              <Skeleton height={288} borderRadius={24} style={{ display: "block", lineHeight: "unset" }} />
              <Skeleton height={288} borderRadius={24} style={{ display: "block", lineHeight: "unset" }} />
            </div>
          </div>
        </div>

        {/* Two-col list subsections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {[0, 1, 2, 3].map((i) => (
            <div key={i}>
              <Skeleton width={140} height={18} className="mb-2" />
              <Skeleton width={220} height={12} className="mb-6" />
              <div className="space-y-4">
                {[0, 1, 2].map((j) => (
                  <div key={j} className="flex gap-4">
                    <Skeleton width={80} height={64} borderRadius={8} style={{ flexShrink: 0 }} />
                    <div className="flex-1 pt-1 space-y-2">
                      <Skeleton height={15} />
                      <Skeleton width="65%" height={12} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* More Stories grid preview */}
        <div className="mb-6">
          <Skeleton width={130} height={18} className="mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[0, 1, 2].map((i) => (
              <div key={i} className="rounded-2xl overflow-hidden border border-slate-100">
                <Skeleton height={180} style={{ display: "block", lineHeight: "unset" }} borderRadius={0} />
                <div className="p-4 space-y-2">
                  <Skeleton height={16} />
                  <Skeleton width="75%" height={14} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </SkeletonTheme>
    );
  }

  const heroCoverImage =
    (canonicalKey && SECTION_BANNERS[canonicalKey]) ??
    articles.at(0)?.cover_image ??
    null;

  return (
    <>
      {/* ── Hero Banner ─────────────────────────────── */}
      <SectionHeroBanner
        label={sectionMeta.label}
        tagline={sectionMeta.tagline}
        coverImage={heroCoverImage}
      />

      {/* ── Featured subsection (big grid) ─────────── */}
      {featuredSubKey && (
        <section className="mb-20">
          <SectionHeading
            label={SUBSECTIONS[featuredSubKey]?.label ?? featuredSubKey}
            tagline={SUBSECTIONS[featuredSubKey]?.tagline}
            size="lg"
          />
          <FeaturedArticleGrid
            articles={(articlesBySubsection[featuredSubKey] ?? []).slice(0, FEATURED_LIMIT)}
          />
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
                  size="lg"
                />
                <div className="space-y-4">
                  {(articlesBySubsection[subKey] ?? []).slice(0, LIST_LIMIT).map((article) => (
                    <ArticleListCard key={article.id} article={article} />
                  ))}
                  {(articlesBySubsection[subKey] ?? []).length === 0 && (
                    <p className="text-sm text-slate-400 italic">No articles yet.</p>
                  )}
                </div>
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
                <div className="space-y-4">
                  {(articlesBySubsection[subKey] ?? []).slice(0, LIST_LIMIT).map((article) => (
                    <ArticleListCard key={article.id} article={article} />
                  ))}
                  {(articlesBySubsection[subKey] ?? []).length === 0 && (
                    <p className="text-sm text-slate-400 italic">No articles yet.</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── More Stories — infinite scroll grid ─────── */}
      {hasMoreStories && (
        <section data-cy="more-stories" className="mt-4">
          <SectionHeading label="More Stories" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {visibleRemaining.map((article) => (
              <ArticleGridCard key={article.id} article={article} />
            ))}
          </div>

          {/* Sentinel — observed to trigger next page */}
          <div ref={sentinelRef} className="h-1" />

          {/* Shimmer rows while fetching next server page */}
          {loadingMore && (
            <SkeletonTheme baseColor="#e2e8f0" highlightColor="#f8fafc">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="rounded-2xl overflow-hidden border border-slate-100">
                    <Skeleton height={180} style={{ display: "block", lineHeight: "unset" }} borderRadius={0} />
                    <div className="p-4 space-y-2">
                      <Skeleton height={16} />
                      <Skeleton width="75%" height={14} />
                    </div>
                  </div>
                ))}
              </div>
            </SkeletonTheme>
          )}
        </section>
      )}
    </>
  );
}
