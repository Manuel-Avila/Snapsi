import PostsContainer from "@/components/PostsContainer";
import { COLORS } from "@/constants/theme";
import { StyleSheet, Text, View } from "react-native";

export default function Bookmarks() {
  const bookmarks = [1, 2, 3, 4, 5];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Bookmarks</Text>
      </View>

      <PostsContainer data={bookmarks} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    gap: 20,
    backgroundColor: COLORS.background,
  },
  header: {
    paddingHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.primary,
  },
});
