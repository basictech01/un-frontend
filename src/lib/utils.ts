import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";
import { SECTIONS, SUBSECTIONS, ArticleStatus } from "@/types/enums";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | null | undefined): string {
  if (!date) return "N/A";
  return format(new Date(date), "MMM d, yyyy");
}

export function formatDateTime(date: string | null | undefined): string {
  if (!date) return "N/A";
  return format(new Date(date), "MMM d, yyyy 'at' h:mm a");
}

export function formatSectionLabel(sectionKey: string): string {
  const section = SECTIONS[sectionKey as keyof typeof SECTIONS];
  return section?.label ?? sectionKey;
}

export function formatSubsectionLabel(subsectionKey: string): string {
  const sub = SUBSECTIONS[subsectionKey];
  return sub?.label ?? subsectionKey;
}

export function formatStatusLabel(status: string): string {
  switch (status) {
    case ArticleStatus.DRAFT:
      return "Draft";
    case ArticleStatus.PENDING:
      return "Pending";
    case ArticleStatus.APPROVED:
      return "Approved";
    case ArticleStatus.REJECTED:
      return "Rejected";
    default:
      return status;
  }
}

/**
 * Extracts initials from a full name
 * Takes the first character of each word (up to 2 words) and returns uppercase initials
 * @param name - Full name string
 * @returns Uppercase initials (max 2 characters)
 * @example
 * getInitials("John Doe") // returns "JD"
 * getInitials("Jane") // returns "J"
 * getInitials("John Paul Smith") // returns "JP"
 * getInitials("") // returns ""
 */
/** Strip HTML tags and estimate reading time at 200 wpm */
export function estimateReadTime(html: string | null | undefined): string {
  if (!html) return "1 min read";
  const text = html.replace(/<[^>]+>/g, " ");
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}

export function getInitials(name: string): string {
  if (!name || typeof name !== "string") return "";

  return name
    .trim()
    .split(" ")
    .filter(Boolean)
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}
