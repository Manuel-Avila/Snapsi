import { COLORS } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import CommentsModal from "./Modals/CommentsModal";
import PulsateButton from "./ui/PulsateButton";
import type { IPost } from "@/types/IPost";
import formatRelativeTime from "@/utils/formatRelativeTime";
import { useMutation, useQueryClient } from "react-query";
import { usePost } from "@/hooks/usePost";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { PLACEHOLDER_PROFILE_IMAGE } from "@/constants/assets";

export default function Post({ post, onActionSuccess }: { post: IPost }) {
  const [showComments, setShowComments] = useState(false);
  const { likePost, unlikePost, bookmarkPost, unbookmarkPost } = usePost();
  const queryClient = useQueryClient();

  const handleOpenComments = () => setShowComments(true);
  const handleCloseComments = () => setShowComments(false);

  const { mutate: handleLikePost, isLoading: isLiking } = useMutation({
    mutationFn: likePost,
    onSuccess: () => {
      queryClient.invalidateQueries("posts");
    },
    onError: () => showToastError("liking"),
  });

  const { mutate: handleUnlikePost, isLoading: isUnliking } = useMutation({
    mutationFn: unlikePost,
    onSuccess: () => {
      queryClient.invalidateQueries("posts");
    },
    onError: () => showToastError("unliking"),
  });

  const { mutate: handleBookmarkPost, isLoading: isBookmarking } = useMutation({
    mutationFn: bookmarkPost,
    onSuccess: () => {
      queryClient.invalidateQueries("posts");
    },
    onError: () => showToastError("bookmarking"),
  });

  const { mutate: handleUnbookmarkPost, isLoading: isUnbookmarking } =
    useMutation({
      mutationFn: unbookmarkPost,
      onSuccess: () => {
        queryClient.invalidateQueries("posts");
      },
      onError: () => showToastError("unbookmarking"),
    });

  const handleToggleAction = (action: string) => {
    let mutationFn;

    if (action === "like") {
      mutationFn = post.is_liked ? handleUnlikePost : handleLikePost;
    } else if (action === "bookmark") {
      mutationFn = post.is_bookmarked
        ? handleUnbookmarkPost
        : handleBookmarkPost;
    }

    if (mutationFn) {
      mutationFn(post.id);
    }
  };

  const showToastError = (action: string) => {
    Toast.show({
      type: "error",
      text1: `Error ${action} post`,
      text2: `Failed to ${action} the post. Please try again.`,
    });
  };

  const isLikeToggling = isLiking || isUnliking;
  const isBookmarkToggling = isBookmarking || isUnbookmarking;

  return (
    <View style={styles.container}>
      <View style={styles.bar}>
        <Link href={`/user/${post.user.username}`} asChild>
          <PulsateButton style={styles.userContainer}>
            <Image
              style={styles.profileImage}
              source={
                post.user.profile_picture_url
                  ? {
                      uri: post.user.profile_picture_url,
                    }
                  : PLACEHOLDER_PROFILE_IMAGE
              }
              contentFit="cover"
              transition={500}
              cachePolicy="memory-disk"
            />
            <Text style={styles.username}>{post.user.name}</Text>
          </PulsateButton>
        </Link>
        <PulsateButton>
          <Ionicons name="ellipsis-vertical" size={20} style={styles.white} />
        </PulsateButton>
      </View>

      <Image
        style={styles.postImage}
        source={{
          uri: post.image_url,
        }}
        contentFit="cover"
        transition={500}
        cachePolicy="memory-disk"
      />

      <View style={styles.bar}>
        <View style={styles.metricsContainer}>
          <PulsateButton
            onPress={() => handleToggleAction("like")}
            disabled={isLikeToggling}
            style={styles.flexRow}
          >
            {post.is_liked ? (
              <Ionicons name="heart" size={25} style={styles.liked} />
            ) : (
              <Ionicons name="heart-outline" size={25} style={styles.white} />
            )}
            {post.like_count > 0 && (
              <Text style={styles.metricText}>{post.like_count}</Text>
            )}
          </PulsateButton>

          <PulsateButton onPress={handleOpenComments} style={styles.flexRow}>
            <Ionicons
              name="chatbubble-outline"
              size={25}
              style={styles.white}
            />
            {post.comment_count > 0 && (
              <Text style={styles.metricText}>{post.comment_count}</Text>
            )}
          </PulsateButton>
        </View>
        <PulsateButton
          onPress={() => handleToggleAction("bookmark")}
          disabled={isBookmarkToggling}
        >
          {post.is_bookmarked ? (
            <Ionicons name="bookmark" size={25} style={styles.bookmarked} />
          ) : (
            <Ionicons name="bookmark-outline" size={25} style={styles.white} />
          )}
        </PulsateButton>
      </View>
      <View style={styles.captionContainer}>
        {post.caption && <Text style={styles.white}>{post.caption}</Text>}
        <Text style={styles.time}>{formatRelativeTime(post.created_at)}</Text>
      </View>

      <CommentsModal
        isVisible={showComments}
        onClose={handleCloseComments}
        postId={post.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
  bar: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  metricsContainer: {
    flexDirection: "row",
    gap: 10,
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  profileImage: {
    width: 25,
    height: 25,
    borderRadius: 50,
  },
  username: {
    fontWeight: "bold",
    color: COLORS.text,
  },
  metricText: {
    color: COLORS.text,
    fontSize: 15,
  },
  liked: {
    color: COLORS.liked,
  },
  bookmarked: {
    color: COLORS.bookmarked,
  },
  white: {
    color: COLORS.text,
  },
  postImage: {
    width: "100%",
    aspectRatio: 1,
  },
  time: {
    color: COLORS.gray,
    fontSize: 12,
  },
  captionContainer: {
    marginTop: -3,
    paddingHorizontal: 15,
    gap: 5,
  },
});
