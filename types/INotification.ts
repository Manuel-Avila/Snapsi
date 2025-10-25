export type Notification = {
  id: number;
  type: string;
  created_at: string;
  sender: {
    id: number;
    username: string;
    profile_picture_url: string | null;
  };
  post: {
    id: number;
    image_url: string;
  } | null;
};
