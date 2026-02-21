"use client";

import { useSectionArticles } from "../../hooks/useSectionArticles";
import { ArticleAuthorCard } from "../molecules/ArticleAuthorCard";
import { RelatedArticleCard } from "../molecules/RelatedArticleCard";
import { ArticleNewsletterCard } from "../molecules/ArticleNewsletterCard";
import type { Article } from "@/types/common";

interface PublicArticleSidebarProps {
  article: Article;
}

export function PublicArticleSidebar({ article }: PublicArticleSidebarProps) {
  const { articles } = useSectionArticles(article.section);

  const related = articles
    .filter((a) => a.id !== article.id)
    .slice(0, 3);

  return (
    <div className="flex flex-col gap-10">
      {article.author && <ArticleAuthorCard author={article.author} />}

      {related.length > 0 && (
        <div className="flex flex-col gap-6">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            Similar Articles
          </h3>
          {related.map((a) => (
            <RelatedArticleCard key={a.id} article={a} />
          ))}
        </div>
      )}

      <ArticleNewsletterCard />
    </div>
  );
}
