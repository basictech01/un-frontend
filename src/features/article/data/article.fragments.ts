import { gql } from "@apollo/client";

export const ARTICLE_LIST_FIELDS = gql`
  fragment ArticleListFields on Article {
    id
    title
    excerpt
    section
    subsections
    cover_image
    status
    rejection_reason
    published_at
    created_at
    updated_at
    author {
      id
      name
      profile_photo
    }
  }
`;

export const ARTICLE_FIELDS = gql`
  fragment ArticleFields on Article {
    id
    author_id
    title
    excerpt
    content
    section
    subsections
    cover_image
    status
    rejection_reason
    published_at
    created_at
    updated_at
    author {
      id
      name
      email
      bio
      profession
      profile_photo
      role
      is_active
      created_at
    }
  }
`;
