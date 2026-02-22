"use client";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useArticle } from "../../hooks/useArticle";
import { PublicArticleHero } from "../molecules/PublicArticleHero";
import { PublicArticleBody } from "../molecules/PublicArticleBody";
import { ArticleShareBar } from "../molecules/ArticleShareBar";
import { PublicArticleSidebar } from "./PublicArticleSidebar";

interface PublicArticleContentProps {
  id: number;
}

export function PublicArticleContent({ id }: PublicArticleContentProps) {
  const { article, loading } = useArticle(id);

  if (loading) {
    return (
      <SkeletonTheme baseColor="#e2e8f0" highlightColor="#f8fafc">
        {/* Hero image */}
        <div className="h-[55vh] min-h-[360px]">
          <Skeleton height="100%" style={{ display: "block", lineHeight: "unset" }} />
        </div>

        {/* Article body + sidebar */}
        <main className="container mx-auto px-4 py-12 lg:py-20 max-w-6xl">
          <div className="flex flex-col lg:flex-row gap-16">
            {/* Body */}
            <div className="w-full lg:w-3/4 space-y-4">
              <Skeleton height={44} width="80%" />
              <Skeleton height={18} width="45%" />
              <div className="mt-8 space-y-3">
                {Array.from({ length: 12 }).map((_, i) => (
                  <Skeleton key={i} height={16} width={i % 5 === 4 ? "55%" : "100%"} />
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="w-full lg:w-1/4 space-y-6">
              <Skeleton height={130} borderRadius={12} style={{ display: "block", lineHeight: "unset" }} />
              <Skeleton height={220} borderRadius={12} style={{ display: "block", lineHeight: "unset" }} />
            </div>
          </div>
        </main>
      </SkeletonTheme>
    );
  }

  if (!article) {
    return (
      <div className="text-center py-32 text-slate-500">
        Article not found.
      </div>
    );
  }

  return (
    <>
      {/* Full-width hero — no container */}
      <PublicArticleHero article={article} />

      {/* Two-column layout */}
      <main className="container mx-auto px-4 py-12 lg:py-20 max-w-6xl">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Article body — 3/4 */}
          <article className="w-full lg:w-3/4">
            <PublicArticleBody article={article} />
            <ArticleShareBar title={article.title} />
          </article>

          {/* Sidebar — 1/4 */}
          <aside className="w-full lg:w-1/4">
            <PublicArticleSidebar article={article} />
          </aside>
        </div>
      </main>
    </>
  );
}
