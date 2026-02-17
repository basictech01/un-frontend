import { PublicNavbar } from "@/features/home/ui/organisms/PublicNavbar";
import { HomePageContent } from "@/features/home/ui/organisms/HomePageContent";
import { PublicFooter } from "@/features/home/ui/molecules/PublicFooter";

export default function HomePage() {
  return (
    <>
      <PublicNavbar />
      <main className="container mx-auto px-4 pt-6 pb-20">
        <HomePageContent />
      </main>
      <PublicFooter />
    </>
  );
}
