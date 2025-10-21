export type IComment = {
  id: number;
  comment_text: string;
  created_at: string;
  user: {
    id: number;
    name: string;
    username: string;
    profile_picture_url: string;
  };
};
