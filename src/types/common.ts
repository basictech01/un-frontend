export interface UserProfile {
  id: number;
  name: string;
  email: string;
  bio: string | null;
  profession: string | null;
  profile_photo: string | null;
  role: string;
  is_active: boolean;
  created_at: string;
}

export interface Article {
  id: number;
  author_id: number;
  title: string;
  excerpt: string | null;
  content: string;
  section: string;
  subsections: string[];
  cover_image: string | null;
  status: string;
  rejection_reason: string | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  author: UserProfile | null;
}

export interface PageInfo {
  startCursor: string | null;
  endCursor: string | null;
  hasNextPage: boolean;
}

export interface ArticleEdge {
  cursor: string;
  node: Article;
}

export interface ArticleConnection {
  edges: ArticleEdge[];
  pageInfo: PageInfo;
  totalCount: number;
}

export interface UserEdge {
  cursor: string;
  node: UserProfile;
}

export interface UserConnection {
  edges: UserEdge[];
  pageInfo: PageInfo;
  totalCount: number;
}

export interface AuthPayload {
  token: string;
  refreshToken: string;
  user: UserProfile;
}

export interface RefreshPayload {
  token: string;
}

export interface ImageFile {
  previewUrl: string;
  file?: File;
}
