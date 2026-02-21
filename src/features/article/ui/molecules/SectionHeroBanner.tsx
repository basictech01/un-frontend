import Image from "next/image";

interface SectionHeroBannerProps {
  label: string;
  tagline: string;
  coverImage?: string | null;
}

export function SectionHeroBanner({
  label,
  tagline,
  coverImage,
}: SectionHeroBannerProps) {
  return (
    <section className="relative h-[300px] rounded-3xl overflow-hidden mb-16 shadow-2xl bg-slate-800">
      {coverImage && (
        <Image
          src={coverImage}
          alt={label}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      )}
      {/* Right-side gradient overlay like the HTML reference */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
      <div className="absolute inset-0 flex flex-col justify-center p-10 md:p-14">
        <div className="max-w-2xl">
          <h1 className="font-display text-4xl md:text-6xl text-white mb-3 leading-tight font-bold">
            {label}
          </h1>
          <p className="text-lg md:text-xl text-slate-200 font-light italic">
            {tagline}
          </p>
        </div>
      </div>
    </section>
  );
}
