import type { Article } from "@/types/common";

interface PublicArticleBodyProps {
  article: Article;
}

export function PublicArticleBody({ article }: PublicArticleBodyProps) {
  return (
    <div className="max-w-3xl mx-auto">
      <div
        className="prose prose-lg prose-slate max-w-none prose-headings:font-display prose-headings:font-bold prose-a:text-slate-blue prose-img:rounded-2xl"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />
    </div>
  );
}
