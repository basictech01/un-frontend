import type { Article } from "./common";

// ─── Re-exports ───────────────────────────────────────────────────────────────

export type { Article };

// ─── Shared Data Types ────────────────────────────────────────────────────────

/** Map of section key → the first Article found in that section */
export type ArticlesBySection = Record<string, Article>;

// ─── Molecule Props ───────────────────────────────────────────────────────────

export interface SectionCardProps {
  sectionKey: string;
  article?: Article;
}

export interface LatestStoryCardProps {
  article: Article;
}

// ─── Organism Props ───────────────────────────────────────────────────────────

export interface HeroSectionProps {
  article?: Article;
  loading?: boolean;
}

export interface ContentUniverseSectionProps {
  articlesBySection: ArticlesBySection;
  loading?: boolean;
}

export interface LatestStoriesSidebarProps {
  articles: Article[];
  loading?: boolean;
}
