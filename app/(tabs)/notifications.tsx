import Loader from "@/components/Loader";
import NoItems from "@/components/NoItems";
import NotificationCard from "@/components/Notification";
import { COLORS } from "@/constants/theme";
import { useNotification } from "@/hooks/useNotification";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { RefreshControl } from "react-native-gesture-handler";
import { useInfiniteQuery } from "react-query";

export default function Notifications() {
  const { getMyNotifications } = useNotification();
  const {
    data,
    error,
    fetchNextPage,
    refetch,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isFetching,
  } = useInfiniteQuery("notifications", getMyNotifications, {
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    refetchOnWindowFocus: false,
  });

  const notifications = data?.pages.flatMap((page) => page.notifications) ?? [];

  const renderContent = () => {
    if (isLoading) {
      return <Loader />;
    }

    if (notifications.length === 0) {
      return (
        <NoItems
          icon="notifications-off-outline"
          message="No notifications yet."
        />
      );
    }

    return (
      <FlatList
        data={notifications}
        renderItem={({ item }) => <NotificationCard notification={item} />}
        keyExtractor={(item) => JSON.stringify(item.id)}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.notificationContainer}
        refreshControl={
          <RefreshControl
            refreshing={isFetching}
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
        <Text style={styles.title}>Notifications</Text>
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
  notificationContainer: {
    paddingHorizontal: 13,
    gap: 15,
  },
  flex: {
    flex: 1,
  },
});
