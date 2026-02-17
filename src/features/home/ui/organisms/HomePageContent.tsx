"use client";

import { useMemo } from "react";
import type { ArticlesBySection } from "@/types/public";
import { usePublishedArticles } from "../../hooks/usePublishedArticles";
import { HeroSection } from "../molecules/HeroSection";
import { ContentUniverseSection } from "../molecules/ContentUniverseSection";
import { LatestStoriesSidebar } from "../molecules/LatestStoriesSidebar";

export function HomePageContent() {
  const { articles, loading } = usePublishedArticles();

  const featuredArticle = articles[0] as (typeof articles)[0] | undefined;

  const articlesBySection = useMemo(() => {
    const map: ArticlesBySection = {};
    for (const article of articles) {
      if (!map[article.section]) {
        map[article.section] = article;
      }
    }
    return map;
  }, [articles]);

  return (
    <>
      <HeroSection article={featuredArticle} loading={loading} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-7 xl:col-span-8 order-2 lg:order-1">
          <ContentUniverseSection
            articlesBySection={articlesBySection}
            loading={loading}
          />
        </div>
        <div className="lg:col-span-5 xl:col-span-4 order-1 lg:order-2">
          <LatestStoriesSidebar articles={articles} loading={loading} />
        </div>
      </div>
    </>
  );
}
