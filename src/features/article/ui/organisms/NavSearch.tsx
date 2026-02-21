"use client";

import { useState, useRef, useEffect } from "react";
import { X, Search } from "lucide-react";
import { UNLoader } from "@/components/organisms";
import { useSearchArticles } from "../../hooks/useSearchArticles";
import { SearchResultCard } from "../molecules/SearchResultCard";

export function NavSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const desktopInputRef = useRef<HTMLInputElement>(null);
  const mobileInputRef = useRef<HTMLInputElement>(null);

  const { articles, loading, hasQuery } = useSearchArticles(query);

  function open() {
    setIsOpen(true);
    setTimeout(() => {
      if (window.innerWidth >= 1280) {
        desktopInputRef.current?.focus();
      } else {
        mobileInputRef.current?.focus();
      }
    }, 60);
  }

  function close() {
    setIsOpen(false);
    setQuery("");
  }

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen]);

  const resultPanel = (
    <>
      {loading && (
        <div className="flex justify-center py-6">
          <UNLoader />
        </div>
      )}
      {!loading && articles.length === 0 && (
        <p className="text-sm text-slate-400 text-center py-6">
          No articles found for &ldquo;{query}&rdquo;
        </p>
      )}
      {!loading && articles.length > 0 && (
        <div className="flex flex-col">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 px-2">
            {articles.length} result{articles.length !== 1 ? "s" : ""}
          </p>
          {articles.map((article) => (
            <SearchResultCard
              key={article.id}
              article={article}
              onSelect={close}
            />
          ))}
        </div>
      )}
    </>
  );

  return (
    <>
      {/* ── DESKTOP (xl+): own relative container so dropdown anchors here ── */}
      <div className="relative hidden xl:flex items-center">
        {!isOpen && (
          <button
            onClick={open}
            className="p-2 text-slate-600 hover:text-slate-900 transition-colors rounded-lg hover:bg-slate-100"
            aria-label="Open search"
          >
            <Search className="w-5 h-5" />
          </button>
        )}

        {isOpen && (
          <div className="flex items-center gap-2 border border-slate-200 rounded-xl px-3 py-2 bg-white w-96 shadow-sm">
            <Search className="w-4 h-4 text-slate-400 shrink-0" />
            <input
              ref={desktopInputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search stories…"
              className="flex-1 text-sm text-slate-900 placeholder:text-slate-400 bg-transparent border-none outline-none"
            />
            <button
              onClick={close}
              className="p-1 text-slate-400 hover:text-slate-700 transition-colors rounded-lg hover:bg-slate-100 shrink-0"
              aria-label="Close search"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Desktop dropdown — right-aligned under the input, anchored here */}
        {isOpen && hasQuery && (
          <div className="absolute top-full right-0 mt-2 w-96 bg-white border border-slate-100 rounded-2xl shadow-2xl z-20 max-h-[420px] overflow-y-auto">
            <div className="p-3">{resultPanel}</div>
          </div>
        )}
      </div>

      {/* ── MOBILE (<xl): search icon ── */}
      <div className="xl:hidden">
        {!isOpen && (
          <button
            onClick={open}
            className="p-2 text-slate-600 hover:text-slate-900 transition-colors rounded-lg hover:bg-slate-100"
            aria-label="Open search"
          >
            <Search className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* ── MOBILE open state (anchored to <nav>'s relative context) ── */}
      {isOpen && (
        <>
          {/* Full nav-height overlay */}
          <div className="xl:hidden absolute inset-x-0 top-0 h-16 md:h-20 bg-white z-20 flex items-center">
            <div className="container mx-auto px-4 flex items-center gap-3">
              <Search className="w-5 h-5 text-slate-400 shrink-0" />
              <input
                ref={mobileInputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search articles, stories, people…"
                className="flex-1 text-base text-slate-900 placeholder:text-slate-400 bg-transparent border-none outline-none"
              />
              <button
                onClick={close}
                className="p-2 text-slate-400 hover:text-slate-700 transition-colors rounded-lg hover:bg-slate-100 shrink-0"
                aria-label="Close search"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Mobile results panel */}
          <div className="xl:hidden absolute top-full left-0 right-0 bg-white border-t border-slate-100 shadow-2xl z-20 max-h-[70vh] overflow-y-auto">
            <div className="container mx-auto px-4 py-4">
              {hasQuery ? (
                resultPanel
              ) : (
                <p className="text-sm text-slate-400 text-center py-6">
                  Start typing to search stories…
                </p>
              )}
            </div>
          </div>

          {/* Invisible backdrop — click outside to close, no grey overlay */}
          <div
            className="fixed inset-0 z-10"
            onClick={close}
            aria-hidden
          />
        </>
      )}
    </>
  );
}
