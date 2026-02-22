"use client";

import { UNLoader } from "@/components/organisms";
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
      <div className="flex items-center justify-center py-32">
        <UNLoader />
      </div>
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
