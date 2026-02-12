import { gql } from "@apollo/client";
import { USER_PROFILE_FIELDS } from "./user.fragments";

export const CREATE_USER = gql`
  ${USER_PROFILE_FIELDS}
  mutation CreateUser($input: SignupInput!) {
    signup(input: $input) {
      user {
        ...UserProfileFields
      }
    }
  }
`;

export const ADMIN_UPDATE_USER = gql`
  ${USER_PROFILE_FIELDS}
  mutation AdminUpdateUser($id: Int!, $input: AdminUpdateUserInput!) {
    adminUpdateUser(id: $id, input: $input) {
      ...UserProfileFields
    }
  }
`;

export const TOGGLE_USER_STATUS = gql`
  ${USER_PROFILE_FIELDS}
  mutation ToggleUserStatus($id: Int!, $isActive: Boolean!) {
    toggleUserStatus(id: $id, isActive: $isActive) {
      ...UserProfileFields
    }
  }
`;
