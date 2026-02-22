"use client";

import { useState } from "react";
import { Share2, Bookmark, BookmarkCheck, Link2 } from "lucide-react";

interface ArticleShareBarProps {
  title: string;
}

export function ArticleShareBar({ title }: ArticleShareBarProps) {
  const [bookmarked, setBookmarked] = useState(false);
  const [copied, setCopied] = useState(false);

  function handleShare() {
    if (typeof navigator !== "undefined" && navigator.share) {
      navigator.share({ title, url: window.location.href });
    } else {
      handleCopy();
    }
  }

  function handleCopy() {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="mt-16 pt-8 border-t border-slate-200 flex items-center justify-between">
      <div className="flex gap-3">
        <button
          onClick={handleShare}
          className="p-2 rounded-full border border-slate-200 hover:bg-slate-100 transition-colors"
          aria-label="Share article"
        >
          <Share2 className="w-5 h-5 text-slate-600" />
        </button>
        <button
          onClick={handleCopy}
          className="p-2 rounded-full border border-slate-200 hover:bg-slate-100 transition-colors"
          aria-label="Copy link"
        >
          <Link2 className="w-5 h-5 text-slate-600" />
        </button>
        <button
          onClick={() => setBookmarked((b) => !b)}
          className="p-2 rounded-full border border-slate-200 hover:bg-slate-100 transition-colors"
          aria-label="Bookmark article"
        >
          {bookmarked ? (
            <BookmarkCheck className="w-5 h-5 text-primary" />
          ) : (
            <Bookmark className="w-5 h-5 text-slate-600" />
          )}
        </button>
      </div>
      {copied && (
        <span className="text-xs font-bold text-forest-green uppercase tracking-widest">
          Link copied!
        </span>
      )}
      {!copied && (
        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
          Share this story
        </span>
      )}
    </div>
  );
}
