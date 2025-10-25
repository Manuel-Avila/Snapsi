import api from "@/api/apiClient";
import type { IComment } from "@/types/IComment";
import type { IPost } from "@/types/IPost";

type GetPostsResponse = {
  posts: IPost[];
  nextCursor: string | null;
};

type CreatePostData = {
  imageUri: string;
  caption: string;
};

type GetCommentsResponse = {
  comments: IComment[];
  nextCursor: string | null;
};

type AddCommentData = {
  postId: number;
  comment_text: string;
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

  const deletePost = async (postId: number) => {
    const response = await api.delete(`/posts/${postId}`);

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

  const getUserPosts = async ({
    queryKey,
    pageParam,
  }): Promise<GetPostsResponse> => {
    const [_key, username] = queryKey;
    const cursor = pageParam;
    const limit = 10;
    const response = await api.get(`/posts/user/${username}`, {
      params: { limit, cursor },
    });

    return response.data;
  };

  const getBookmarkedPosts = async ({ pageParam }: { pageParam?: string }) => {
    const limit = 10;
    const cursor = pageParam;

    const response = await api.get("/posts/bookmarks", {
      params: { limit, cursor },
    });

    return response.data;
  };

  const getPostById = async ({
    queryKey,
  }: {
    queryKey: (string | number | undefined)[];
  }) => {
    const [_key, id] = queryKey;
    const response = await api.get(`/posts/${id}`);

    return response.data?.post;
  };

  const getComments = async ({
    queryKey,
    pageParam,
  }: {
    queryKey: (string | number)[];
    pageParam?: string;
  }): Promise<GetCommentsResponse> => {
    const [_key, postId] = queryKey;
    const limit = 10;

    const response = await api.get(`/posts/${postId}/comments`, {
      params: { limit, cursor: pageParam },
    });

    return response.data;
  };

  const addComment = async (data: AddCommentData) => {
    const response = await api.post(`/posts/${data.postId}/comments`, {
      comment_text: data.comment_text,
    });

    return response.data;
  };

  const likePost = async (id: number) => {
    const response = await api.post(`/posts/${id}/like`);

    return response.data;
  };

  const unlikePost = async (id: number) => {
    const response = await api.delete(`/posts/${id}/like`);
    return response.data;
  };

  const bookmarkPost = async (id: number) => {
    const response = await api.post(`/posts/${id}/bookmark`);
    return response.data;
  };
  const unbookmarkPost = async (id: number) => {
    const response = await api.delete(`/posts/${id}/bookmark`);
    return response.data;
  };

  return {
    createPost,
    deletePost,
    getPosts,
    likePost,
    unlikePost,
    bookmarkPost,
    unbookmarkPost,
    getComments,
    addComment,
    getUserPosts,
    getPostById,
    getBookmarkedPosts,
  };
};
