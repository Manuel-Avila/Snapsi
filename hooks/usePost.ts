import api from "@/api/apiClient";
import type { IPost } from "@/types/IPost";

type GetPostsResponse = {
  posts: IPost[];
  nextCursor: string | null;
};

type CreatePostData = {
  imageUri: string;
  caption: string;
};

export const usePost = () => {
  const createPost = async (data: CreatePostData) => {
    const formData = new FormData();
    const fileName = data.imageUri.split("/").pop();
    const fileType = fileName?.split(".").pop();

    formData.append("image", {
      uri: data.imageUri,
      name: fileName,
      type: `image/${fileType}`,
    } as any);

    formData.append("caption", data.caption);

    const response = await api.post("/posts", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  };

  const getPosts = async ({
    pageParam,
  }: {
    pageParam?: string;
  }): Promise<GetPostsResponse> => {
    const cursor = pageParam;
    const limit = 10;

    const response = await api.get("/posts", {
      params: { limit, cursor },
    });

    return response.data;
  };

  const likePost = async (id: number) => {
    const response = await api.post(`/posts/${id}/like`);

    return response.data;
  };

  return { createPost, getPosts, likePost };
};
