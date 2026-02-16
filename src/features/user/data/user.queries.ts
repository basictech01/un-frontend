import { gql } from "@apollo/client";
import { USER_PROFILE_FIELDS } from "./user.fragments";

export const GET_USERS = gql`
  ${USER_PROFILE_FIELDS}
  query GetUsers($first: Int, $after: String, $filter: UserFilter) {
    users(first: $first, after: $after, filter: $filter) {
      edges {
        cursor
        node {
          ...UserProfileFields
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

export const GET_AUTHORS = gql`
  ${USER_PROFILE_FIELDS}
  query GetAuthors($first: Int, $after: String, $filter: UserFilter) {
    authors(first: $first, after: $after, filter: $filter) {
      edges {
        cursor
        node {
          ...UserProfileFields
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

export const GET_ADMINS = gql`
  ${USER_PROFILE_FIELDS}
  query GetAdmins($first: Int, $after: String, $filter: UserFilter) {
    admins(first: $first, after: $after, filter: $filter) {
      edges {
        cursor
        node {
          ...UserProfileFields
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
