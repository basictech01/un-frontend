import { PublicNavbar } from "@/features/home/ui/organisms/PublicNavbar";
import { PublicFooter } from "@/features/home/ui/molecules/PublicFooter";
import { PublicArticleContent } from "@/features/article/ui/organisms/PublicArticleContent";

interface ArticlePageProps {
  params: Promise<{ id: string }>;
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { id } = await params;
  const articleId = parseInt(id, 10);

  return (
    <>
      <PublicNavbar />
      <PublicArticleContent id={articleId} />
      <PublicFooter />
    </>
  );
}
