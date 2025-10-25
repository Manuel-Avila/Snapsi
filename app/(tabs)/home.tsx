import Loader from "@/components/Loader";
import Post from "@/components/Post";
import StoriesContainer from "@/components/StoriesContainer";
import PulsateButton from "@/components/ui/PulsateButton";
import { COLORS } from "@/constants/theme";
import { useAuth } from "@/context/AuthContext";
import { usePost } from "@/hooks/usePost";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { FlatList, RefreshControl } from "react-native-gesture-handler";
import { useInfiniteQuery } from "react-query";

export default function Home() {
  const { logout } = useAuth();
  const { getPosts } = usePost();

  const {
    data,
    error,
    fetchNextPage,
    refetch,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isFetching,
  } = useInfiniteQuery("posts", getPosts, {
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    refetchOnWindowFocus: false,
  });

  const posts = data?.pages.flatMap((page) => page.posts) ?? [];

  const isRefreshing = isFetching && !isLoading && !isFetchingNextPage;

  const renderContent = () => {
    if (isLoading) {
      return <Loader />;
    }

    return (
      <FlatList
        data={posts}
        renderItem={({ item }) => <Post post={item} queryKey={"posts"} />}
        keyExtractor={(item) => JSON.stringify(item.id)}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.postsContainer}
        ListHeaderComponent={<StoriesContainer />}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={refetch}
            colors={[COLORS.primary]}
            progressBackgroundColor={COLORS.background}
            tintColor={COLORS.primary}
          />
        }
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        }}
        onEndReachedThreshold={0.5}
        ListFooterComponent={isFetchingNextPage ? <Loader /> : null}
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Snapsi</Text>
        <PulsateButton onPress={logout}>
          <Ionicons name="log-out-outline" style={styles.logoutIcon} />
        </PulsateButton>
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
  postsContainer: {
    gap: 20,
    paddingBottom: 70,
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
  logoutIcon: {
    color: COLORS.text,
    fontSize: 24,
  },
  flex: {
    flex: 1,
  },
});
