import { ArticleStatus } from "@/types/enums";
import type { ImageFile } from "@/types/common";

export interface ArticleFormState {
  title: string;
  content: string;
  excerpt: string;
  section: string;
  subsections: string[];
  coverImage: string;
  coverImageFile: ImageFile | null;
  status: ArticleStatus;
}

export interface ArticleFormErrors {
  title?: string;
  content?: string;
  section?: string;
  subsections?: string;
}

export interface ArticleFilterState {
  search: string;
  status: ArticleStatus | "";
  section: string;
}

export const initialArticleForm: ArticleFormState = {
  title: "",
  content: "",
  excerpt: "",
  section: "",
  subsections: [],
  coverImage: "",
  coverImageFile: null,
  status: ArticleStatus.DRAFT,
};
