export type IPost = {
  id: number;
  image_url: string;
  caption: string;
  created_at: string;
  like_count: number;
  comment_count: number;
  is_liked: boolean;
  is_bookmarked: boolean;
  user: {
    id: number;
    username: string;
    profile_image: string;
  };
};
