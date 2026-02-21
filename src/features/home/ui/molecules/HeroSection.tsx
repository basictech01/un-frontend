import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/ui/button";
import type { HeroSectionProps } from "@/types/public";

export function HeroSection({ article, loading }: HeroSectionProps) {
  const title = article?.title ?? "The Himalayan Spirit Lives On";
  const excerpt =
    article?.excerpt ??
    "Exploring the stories, culture, and resilience of Uttarakhand's people and the landscapes they call home.";
  const href = article ? `/articles/${article.id}` : "#";

  if (loading) {
    return (
      <section className="relative h-[65vh] min-h-[50vh] rounded-[2.5rem] overflow-hidden mb-16 bg-slate-200 animate-pulse" />
    );
  }

  return (
    <section className="relative h-[65vh] min-h-[50vh] rounded-[2.5rem] overflow-hidden mb-16 group shadow-2xl bg-slate-200">
      {/* Background */}
      <div className="absolute inset-0">
        {article?.cover_image ? (
          <Image
            src={article.cover_image}
            alt={title}
            fill
            priority
            className="object-cover transition-transform duration-[2s] group-hover:scale-105"
            sizes="100vw"
          />
        ) : (
          <div className="absolute inset-0 bg-slate-800" />
        )}
      </div>


      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16 lg:p-20">
        <div className="max-w-4xl">
          <h2 className="font-display text-5xl md:text-7xl text-white mb-8 leading-[1.05] font-medium tracking-tight">
            {title}
          </h2>
          <div className="flex flex-col md:flex-row md:items-center gap-8">
            <p className="text-lg text-slate-200 max-w-xl font-light leading-relaxed">
              {excerpt}
            </p>
            <Button
              asChild
              className="rounded-full bg-white text-slate-950 px-8 h-auto py-4 font-bold hover:bg-primary hover:text-white transition-all shrink-0 self-start"
            >
              <Link href={href}>
                Read Story
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
