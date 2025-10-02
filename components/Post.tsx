import { COLORS } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import CommentsModal from "./Modals/CommentsModal";
import PulsateButton from "./ui/PulsateButton";

export default function Post({ post }) {
  const [showComments, setShowComments] = useState(false);

  const handleOpenComments = () => setShowComments(true);
  const handleCloseComments = () => setShowComments(false);

  return (
    <View style={styles.container}>
      <View style={styles.bar}>
        <Link href="/user/3" asChild>
          <PulsateButton style={styles.flexRow}>
            <Image
              style={styles.profileImage}
              source={{
                uri: post.profileImage,
              }}
              contentFit="cover"
              transition={500}
              cachePolicy="memory-disk"
            />
            <Text style={styles.username}>{post.username}</Text>
          </PulsateButton>
        </Link>
        <PulsateButton>
          <Ionicons name="ellipsis-vertical" size={20} style={styles.white} />
        </PulsateButton>
      </View>

      <Image
        style={styles.postImage}
        source={{
          uri: post.postImage,
        }}
        contentFit="cover"
        transition={500}
        cachePolicy="memory-disk"
      />

      <View style={styles.bar}>
        <View style={styles.flexRow}>
          <PulsateButton>
            <Ionicons name="heart-outline" size={25} style={styles.white} />
          </PulsateButton>
          <PulsateButton onPress={handleOpenComments}>
            <Ionicons
              name="chatbubble-outline"
              size={25}
              style={styles.white}
            />
          </PulsateButton>
        </View>
        <PulsateButton>
          <Ionicons name="bookmark-outline" size={25} style={styles.white} />
        </PulsateButton>
      </View>
      <View style={styles.postMetrics}>
        <Text style={styles.white}>{post.likes} likes</Text>
        <Text style={styles.time}>{post.timePosted}</Text>
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
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
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
  white: {
    color: COLORS.text,
  },
  postImage: {
    width: "100%",
    aspectRatio: 1,
  },
  time: {
    color: COLORS.gray,
  },
  postMetrics: {
    paddingHorizontal: 15,
    gap: 5,
  },
});
