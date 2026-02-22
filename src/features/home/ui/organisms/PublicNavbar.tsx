"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SECTIONS } from "@/types/enums";
import { NavSearch } from "@/features/article/ui/organisms/NavSearch";

// Short display labels for the nav bar
const NAV_LABEL: Record<string, string> = {
  VOICES_AND_VISIONARIES: "Voices",
  LEARNING_AND_LADDERS: "Learning",
  GROWTH_AND_GRIT: "Growth",
  STATE_AND_STEWARDSHIP: "Stewardship",
  NATURE_AND_NURTURE: "Nature",
  SPIRIT_AND_STORY: "Spirit",
};

const NAV_SECTIONS = Object.values(SECTIONS).map((s) => ({
  key: s.key,
  label: NAV_LABEL[s.key] ?? s.label,
  href: `/section/${s.key.toLowerCase()}`,
}));

export function PublicNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  function isActive(href: string) {
    return pathname.startsWith(href);
  }

  return (
    // `relative` is required so NavSearch's absolute overlay resolves to this nav
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 relative">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center group shrink-0">
            <div className="relative h-12 w-12 shrink-0">
              <Image
                src="/logo/image.png"
                alt="Uttrakhand Next"
                fill
                sizes="48px"
                className="object-contain"
              />
            </div>
          </Link>

          {/* Desktop Nav links */}
          <div className="hidden xl:flex items-center gap-8">
            {NAV_SECTIONS.map((s) => (
              <Link
                key={s.key}
                href={s.href}
                className={`text-xs font-bold uppercase tracking-wider transition-colors ${
                  isActive(s.href)
                    ? "text-primary border-b-2 border-primary pb-0.5"
                    : "text-slate-600 hover:text-primary"
                }`}
              >
                {s.label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* NavSearch — self-contained organism with overlay */}
            <NavSearch />

            <button
              className="xl:hidden p-2 text-slate-600 hover:text-slate-900 transition-colors rounded-lg hover:bg-slate-100"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {menuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {menuOpen && (
          <div className="xl:hidden border-t border-slate-100 py-4">
            <div className="flex flex-col gap-1">
              {NAV_SECTIONS.map((s) => (
                <Link
                  key={s.key}
                  href={s.href}
                  className={`text-xs font-bold uppercase tracking-wider transition-colors py-2 px-2 rounded-lg ${
                    isActive(s.href)
                      ? "text-primary bg-slate-50"
                      : "text-slate-600 hover:text-primary hover:bg-slate-100"
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  {s.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
