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
import { useMutation } from "react-query";
import { usePost } from "@/hooks/usePost";

export default function Post({ post }: { post: IPost }) {
  const [showComments, setShowComments] = useState(false);
  const { likePost } = usePost();

  const handleOpenComments = () => setShowComments(true);
  const handleCloseComments = () => setShowComments(false);

  const { mutate: handleLikePost } = useMutation({
    mutationFn: likePost,
    onSuccess: async () => {},
    onError: () => {},
  });

  return (
    <View style={styles.container}>
      <View style={styles.bar}>
        <Link href="/user/3" asChild>
          <PulsateButton style={styles.userContainer}>
            <Image
              style={styles.profileImage}
              source={
                post.user.profile_image
                  ? {
                      uri: post.user.profile_image,
                    }
                  : require("@/assets/images/profile-image-placeholder.webp")
              }
              contentFit="cover"
              transition={500}
              cachePolicy="memory-disk"
            />
            <Text style={styles.username}>{post.user.username}</Text>
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
          <View style={styles.flexRow}>
            <PulsateButton>
              <Ionicons name="heart-outline" size={25} style={styles.white} />
            </PulsateButton>
            {post.like_count > 0 && (
              <Text style={styles.metricText}>{post.like_count}</Text>
            )}
          </View>
          <View style={styles.flexRow}>
            <PulsateButton onPress={handleOpenComments}>
              <Ionicons
                name="chatbubble-outline"
                size={25}
                style={styles.white}
              />
            </PulsateButton>
            {post.comment_count > 0 && (
              <Text style={styles.metricText}>{post.comment_count}</Text>
            )}
          </View>
        </View>
        <PulsateButton>
          <Ionicons name="bookmark-outline" size={25} style={styles.white} />
        </PulsateButton>
      </View>
      <View style={styles.postMetrics}>
        {post.caption && <Text style={styles.white}>{post.caption}</Text>}
        <Text style={styles.time}>{formatRelativeTime(post.created_at)}</Text>
      </View>

      <CommentsModal isVisible={showComments} onClose={handleCloseComments} />
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
    fontSize: 17,
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
  postMetrics: {
    paddingHorizontal: 15,
    gap: 5,
  },
});
