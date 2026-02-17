import { gql } from "@apollo/client";
import { ARTICLE_FIELDS } from "./article.fragments";

export const CREATE_ARTICLE = gql`
  ${ARTICLE_FIELDS}
  mutation CreateArticle($input: CreateArticleInput!) {
    createArticle(input: $input) {
      ...ArticleFields
    }
  }
`;

export const UPDATE_ARTICLE = gql`
  ${ARTICLE_FIELDS}
  mutation UpdateArticle($id: Int!, $input: UpdateArticleInput!) {
    updateArticle(id: $id, input: $input) {
      ...ArticleFields
    }
  }
`;

export const DELETE_ARTICLE = gql`
  ${ARTICLE_FIELDS}
  mutation DeleteArticle($id: Int!) {
    deleteArticle(id: $id) {
      ...ArticleFields
    }
  }
`;

export const APPROVE_ARTICLE = gql`
  ${ARTICLE_FIELDS}
  mutation ApproveArticle($id: Int!) {
    approveArticle(id: $id) {
      ...ArticleFields
    }
  }
`;

export const REJECT_ARTICLE = gql`
  ${ARTICLE_FIELDS}
  mutation RejectArticle($id: Int!, $reason: String!) {
    rejectArticle(id: $id, reason: $reason) {
      ...ArticleFields
    }
  }
`;

export const BULK_APPROVE_ARTICLES = gql`
  mutation BulkApproveArticles($ids: [Int!]!) {
    bulkApproveArticles(ids: $ids)
  }
`;

export const BULK_DELETE_ARTICLES = gql`
  mutation BulkDeleteArticles($ids: [Int!]!) {
    bulkDeleteArticles(ids: $ids)
  }
`;

export const SUBMIT_ARTICLE = gql`
  ${ARTICLE_FIELDS}
  mutation SubmitArticle($id: Int!) {
    submitArticle(id: $id) {
      ...ArticleFields
    }
  }
`;

export const RESUBMIT_ARTICLE = gql`
  ${ARTICLE_FIELDS}
  mutation ResubmitArticle($id: Int!) {
    resubmitArticle(id: $id) {
      ...ArticleFields
    }
  }
`;
