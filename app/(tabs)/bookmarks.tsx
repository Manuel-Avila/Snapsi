import Loader from "@/components/Loader";
import PostsContainer from "@/components/PostsContainer";
import { COLORS } from "@/constants/theme";
import { usePost } from "@/hooks/usePost";
import { StyleSheet, Text, View } from "react-native";
import { useInfiniteQuery } from "react-query";

export default function Bookmarks() {
  const { getBookmarkedPosts } = usePost();
  const {
    data,
    isLoading,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
  } = useInfiniteQuery("bookmarks", getBookmarkedPosts, {
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    refetchOnWindowFocus: false,
  });

  const bookmarks = data?.pages.flatMap((page) => page.posts) ?? [];

  const renderContent = () => {
    if (isLoading) {
      return <Loader />;
    }

    return (
      <PostsContainer
        data={bookmarks}
        refetch={refetch}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        isFetching={isFetching}
        noDataIcon="bookmark-outline"
        noDataMessage="No bookmarked posts yet"
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Bookmarks</Text>
      </View>

      <View style={styles.flex}>{renderContent()}</View>
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
  flex: {
    flex: 1,
  },
});
