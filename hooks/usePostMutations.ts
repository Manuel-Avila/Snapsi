import { useMutation, useQueryClient } from "react-query";
import { usePost } from "./usePost";
import Toast from "react-native-toast-message";

export const usePostMutations = (queryKey: string | (string | number)[]) => {
  const queryClient = useQueryClient();
  const { likePost, unlikePost, bookmarkPost, unbookmarkPost, deletePost } =
    usePost();

  const showToastError = (action: string) => {
    Toast.show({
      type: "error",
      text1: `Error ${action} post`,
      text2: `Failed to ${action} the post. Please try again.`,
    });
  };

  const onSuccess = () => {
    queryClient.invalidateQueries(queryKey);
  };

  const { mutate: handleLikePost, isLoading: isLiking } = useMutation({
    mutationFn: likePost,
    onSuccess: onSuccess,
    onError: () => showToastError("liking"),
  });

  const { mutate: handleUnlikePost, isLoading: isUnliking } = useMutation({
    mutationFn: unlikePost,
    onSuccess: onSuccess,
    onError: () => showToastError("unliking"),
  });

  const { mutate: handleBookmarkPost, isLoading: isBookmarking } = useMutation({
    mutationFn: bookmarkPost,
    onSuccess: onSuccess,
    onError: () => showToastError("bookmarking"),
  });

  const { mutate: handleUnbookmarkPost, isLoading: isUnbookmarking } =
    useMutation({
      mutationFn: unbookmarkPost,
      onSuccess: onSuccess,
      onError: () => showToastError("unbookmarking"),
    });

  const { mutate: handleDeletePost, isLoading: isDeleting } = useMutation({
    mutationFn: deletePost,
    onSuccess: onSuccess,
    onError: () => showToastError("deleting"),
  });

  return {
    handleDeletePost,
    isDeleting,
    handleLikePost,
    isLiking,
    handleUnlikePost,
    isUnliking,
    handleBookmarkPost,
    isBookmarking,
    handleUnbookmarkPost,
    isUnbookmarking,
  };
};
