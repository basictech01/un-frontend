"use client";

import { useMemo } from "react";
import type { ArticlesBySection } from "@/types/public";
import { useTrendingArticles } from "../../hooks/useTrendingArticles";
import { usePublishedArticles } from "../../hooks/usePublishedArticles";
import { HeroSection } from "../molecules/HeroSection";
import { ContentUniverseSection } from "../molecules/ContentUniverseSection";
import { LatestStoriesSidebar } from "../molecules/LatestStoriesSidebar";

export function HomePageContent() {
  const { articles: trendingArticles, loading: trendingLoading } =
    useTrendingArticles(20);
  const { articles: latestArticles, loading: latestLoading } =
    usePublishedArticles();

  // Hero = top trending article
  const heroArticle = trendingArticles.at(0);

  // Universes = one trending article per section, skipping the hero article
  const articlesBySection = useMemo(() => {
    const map: ArticlesBySection = {};
    for (const article of trendingArticles) {
      if (article.id === heroArticle?.id) continue;
      if (!map[article.section]) {
        map[article.section] = article;
      }
    }
    return map;
  }, [trendingArticles, heroArticle]);

  const loading = trendingLoading || latestLoading;

  return (
    <>
      <HeroSection article={heroArticle} loading={trendingLoading} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-7 xl:col-span-8 order-2 lg:order-1">
          <ContentUniverseSection
            articlesBySection={articlesBySection}
            loading={trendingLoading}
          />
        </div>
        <div className="lg:col-span-5 xl:col-span-4 order-1 lg:order-2">
          <LatestStoriesSidebar articles={latestArticles} loading={latestLoading} />
        </div>
      </div>
    </>
  );
}
