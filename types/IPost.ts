export type IPost = {
  id: number;
  image_url: string;
  image_cloudinary_id: string;
  caption: string;
  created_at: string;
  like_count: number;
  comment_count: number;
  is_liked: boolean;
  is_bookmarked: boolean;
  user: {
    id: number;
    name: string;
    username: string;
    profile_picture_url: string;
  };
};
