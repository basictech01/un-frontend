import { gql } from "@apollo/client";

export const USER_PROFILE_FIELDS = gql`
  fragment UserProfileFields on UserProfile {
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
`;
