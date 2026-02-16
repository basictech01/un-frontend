import { gql } from "@apollo/client";
import { ARTICLE_LIST_FIELDS, ARTICLE_FIELDS } from "./article.fragments";

export const GET_ARTICLES = gql`
  ${ARTICLE_LIST_FIELDS}
  query GetArticles($first: Int, $after: String, $filter: ArticleFilter) {
    articles(first: $first, after: $after, filter: $filter) {
      edges {
        cursor
        node {
          ...ArticleListFields
        }
      }
      pageInfo {
        startCursor
        endCursor
        hasNextPage
      }
      totalCount
    }
  }
`;

export const GET_PENDING_ARTICLES = gql`
  ${ARTICLE_LIST_FIELDS}
  query GetPendingArticles($first: Int, $after: String) {
    pendingArticles(first: $first, after: $after) {
      edges {
        cursor
        node {
          ...ArticleListFields
        }
      }
      pageInfo {
        startCursor
        endCursor
        hasNextPage
      }
      totalCount
    }
  }
`;

export const GET_ARTICLE = gql`
  ${ARTICLE_FIELDS}
  query GetArticle($id: Int!) {
    article(id: $id) {
      ...ArticleFields
    }
  }
`;
