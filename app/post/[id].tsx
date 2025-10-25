import Loader from "@/components/Loader";
import NoItems from "@/components/NoItems";
import Post from "@/components/Post";
import PulsateButton from "@/components/ui/PulsateButton";
import { COLORS } from "@/constants/theme";
import { usePost } from "@/hooks/usePost";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, StyleSheet } from "react-native";
import { useQuery } from "react-query";

export default function PostScreen() {
  const router = useRouter();
  const { id, openComments } = useLocalSearchParams();
  const { getPostById } = usePost();
  const queryKey = ["post", id.toString()];
  const { data: post, isLoading, error } = useQuery(queryKey, getPostById);

  const renderContent = () => {
    if (isLoading) {
      return <Loader />;
    }

    if (!post) {
      return <NoItems icon="image-outline" message="Post not found." />;
    }

    return (
      <Post
        post={post}
        queryKey={queryKey}
        openComments={openComments === "true"}
      />
    );
  };

  return (
    <View style={styles.container}>
      <PulsateButton
        onPress={() => router.back()}
        style={styles.arrowBackContainer}
        scaleOnPress={0.7}
      >
        <Ionicons name="arrow-back-outline" style={styles.icon} />
      </PulsateButton>
      <Text style={styles.title}>Post</Text>
      <View style={styles.flex}>{renderContent()}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  arrowBackContainer: {
    position: "absolute",
    top: 30,
    left: 20,
    zIndex: 1,
  },
  icon: {
    color: COLORS.text,
    fontSize: 30,
  },
  title: {
    color: COLORS.text,
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 30,
  },
  flex: {
    flex: 1,
  },
});
