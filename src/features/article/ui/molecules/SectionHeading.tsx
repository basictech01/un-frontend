interface SectionHeadingProps {
  label: string;
  tagline?: string;
  size?: "lg" | "md";
}

export function SectionHeading({
  label,
  tagline,
  size = "md",
}: SectionHeadingProps) {
  return (
    <div className="flex items-center gap-4 mb-8">
      <h2
        className={`font-display font-bold text-slate-blue whitespace-nowrap ${
          size === "lg" ? "text-3xl" : "text-2xl"
        }`}
      >
        {tagline ? `${label} – ${tagline}` : label}
      </h2>
      <div className="h-px bg-slate-200 flex-grow" />
    </div>
  );
}
