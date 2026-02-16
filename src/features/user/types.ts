export interface UserFilterState {
  search: string;
  role: string;
  isActive: boolean | null;
}

export interface UserFormState {
  name: string;
  bio: string;
  profession: string;
  profile_photo: string;
}
