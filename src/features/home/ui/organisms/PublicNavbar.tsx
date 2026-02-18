"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const NAV_SECTIONS = [
  { key: "VOICES_AND_VISIONARIES", label: "Voices" },
  { key: "LEARNING_AND_LADDERS", label: "Learning" },
  { key: "GROWTH_AND_GRIT", label: "Growth" },
  { key: "STATE_AND_STEWARDSHIP", label: "Stewardship" },
  { key: "NATURE_AND_NURTURE", label: "Nature" },
  { key: "SPIRIT_AND_STORY", label: "Spirit" },
];

export function PublicNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <div className="relative h-10 w-10 shrink-0">
              <Image
                src="/logo/image.png"
                alt="Uttrakhand Next"
                fill
                sizes="40px"
                className="object-contain"
              />
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden xl:flex items-center gap-8">
            {NAV_SECTIONS.map((s) => (
              <Link
                key={s.key}
                href={`/section/${s.key.toLowerCase()}`}
                className="text-xs font-bold uppercase tracking-wider text-slate-600 hover:text-primary transition-colors"
              >
                {s.label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Link
              href="/search"
              className="p-2 text-slate-600 hover:text-slate-900 transition-colors rounded-lg hover:bg-slate-100"
              aria-label="Search"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </Link>
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
                  href={`/section/${s.key.toLowerCase()}`}
                  className="text-xs font-bold uppercase tracking-wider text-slate-600 hover:text-primary transition-colors py-2 px-2 rounded-lg hover:bg-slate-100"
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
