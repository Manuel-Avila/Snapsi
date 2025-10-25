export type UserProfile = {
  id: number;
  username: string;
  name: string;
  age: number;
  bio: string | null;
  follower_count: number;
  following_count: number;
  gender: string;
  post_count: number;
  profile_picture_url: string | null;
  is_followed: boolean;
};
