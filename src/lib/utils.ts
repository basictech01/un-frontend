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
