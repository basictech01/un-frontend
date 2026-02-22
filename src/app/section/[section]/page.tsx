import { PublicNavbar } from "@/features/home/ui/organisms/PublicNavbar";
import { PublicFooter } from "@/features/home/ui/molecules/PublicFooter";
import { SectionPageContent } from "@/features/article/ui/organisms/SectionPageContent";

interface SectionPageProps {
  params: Promise<{ section: string }>;
}

export default async function SectionPage({ params }: SectionPageProps) {
  const { section } = await params;

  return (
    <>
      <PublicNavbar />
      <main className="container mx-auto px-4 pt-6 pb-20">
        <SectionPageContent sectionKey={section} />
      </main>
      <PublicFooter />
    </>
  );
}
