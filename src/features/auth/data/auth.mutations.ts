import { gql } from "@apollo/client";

export const LOGIN_MUTATION = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      token
      refreshToken
      user {
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
  }
`;

export const REFRESH_TOKEN_MUTATION = gql`
  mutation RefreshToken($token: String!) {
    refreshToken(token: $token) {
      token
    }
  }
`;

export const ME_QUERY = gql`
  query Me {
    me {
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

export const UPDATE_PROFILE_MUTATION = gql`
  mutation UpdateProfile($input: UpdateProfileInput!) {
    updateProfile(input: $input) {
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
