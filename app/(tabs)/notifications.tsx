import NoItems from "@/components/NoItems";
import Notification from "@/components/Notification";
import { COLORS } from "@/constants/theme";
import { FlatList, StyleSheet, Text, View } from "react-native";

export default function Notifications() {
  const notifications = [1, 3, 4, 5];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Notifications</Text>
      </View>

      {notifications.length === 0 ? (
        <NoItems icon="heart-outline" message="No notifications yet" />
      ) : (
        <FlatList
          data={notifications}
          renderItem={({ item }) => <Notification notification={item} />}
          keyExtractor={(_, i) => i.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.notificationContainer}
        />
      )}
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
});
