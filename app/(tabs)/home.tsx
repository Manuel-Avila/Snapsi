import Loader from "@/components/Loader";
import Post from "@/components/Post";
import StoriesContainer from "@/components/StoriesContainer";
import PulsateButton from "@/components/ui/PulsateButton";
import { COLORS } from "@/constants/theme";
import { useAuth } from "@/context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { FlatList, RefreshControl } from "react-native-gesture-handler";
import { useQuery } from "react-query";

const getPosts = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: "1",
          username: "Username",
          profileImage:
            "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQAoQMBIgACEQEDEQH/xAAbAAEBAQEBAQEBAAAAAAAAAAAAAQIFBAMGB//EADcQAAIBAwEFBAYJBQAAAAAAAAABAgMEESEFMUFRYRIiMnFCUmKBkfATFSM0coKhscEUJNHh8f/EABUBAQEAAAAAAAAAAAAAAAAAAAAB/8QAFhEBAQEAAAAAAAAAAAAAAAAAABEB/9oADAMBAAIRAxEAPwD+uAAqAAAAAAAAAAAAAAAAAe4EbAGSsgBmWVkAZBCAfcAAAAAAKBD5XFxTt45qS37lxPnfXatod3DqPwrl1Zw6k5VJuU5OTe9sD3Vtq1JPFGKgub1bPNK7uZPWtP3PB8AB9ld3Ed1eb956aW1K0X9olNfBngAH6C2u6VwsU33vUe//AGffJ+ZUnFpxeGtzR2LC9+nzTq6VVu9pAe1sjHAgAgIwBllyRgMohAB6QAAAAAlSUYQlKe6Kyynh2vPs2qgm+/LD8vnAHKr1pV6sqk97PmAUAAAAAARk4SUovEk8pkZAP0VvWVejGotMrVcmbObsao2qlJ7k1JfPwOlkgjICZAGW9QyNgM+QIAPWAAAAAHL22+9SXRnUObtmHcpT5Nr4gcoAFAAAAQjANkAA9uyH/ctew/4OucrY8c1qkuCjj4/8OqyCMy2Vsy2AMsMyBQZAHvAAAAAD43lH6e2nBLXGY+Z9gB+Y6PgDo7UtHCUq9Nd2XixwZztxcAAgEyAQAQfqeqwtXWmpSTVOO/q+QHQ2bRdK2TktZvtf4PS2P2I2QRsmQzLYBsyyszIBkGc9EAOkAAAAAAABo8prRnKu9mtNztln2OXkdOpUhSj2qk1FdWeKe1LdT7Pfa9bG4Djyi4NxkmmuDMs/QKrbXUd9OfR7z5y2dbS9BrykxRwv0C1eFq3yR2/q624wb85M3m3to6OnT6/Ooo59ts6c2p18wjy4s6kYxpwUYLEVuSPH9Z26n2e/j1uyeinWp1lmlOMveBtmSsy2AbMsNkbwBGzLYbI2BMlJgAdQAAAAAOfebSUMwoYlJb5PgY2peNN0KTx67X7HKA1UnOpLtVJOT5swytkKIzarVY+GrJfmZggG5VqsvFVm/wAzPnxyCMBkKTi8xbT6EIB0bbaLWI19eU1/J0Mp6pprmfnW9T12F26clSqP7NvRv0SDrMw2VvJlgRsjYbM5AuhCZQA7AAAHxvK/9Pbyn6W6K6n2OTtmq3VhTW5LL8wOc228ve9SMZIUCAgAhWZAEZcmQBGw2ZANmXuwVmQOzs+v9NQSlrOGj69T7s5OzanYuVHhNYOpkgEZTLAuvME97AHZAAA4G0Zdq9qdHg7zZ+evvvlb8QHwZCkKIAQAyMGQDI9Ssy2BGTJTLAEYbMgbpS7NWm+Ukd1n5+Hjj5o77ZBGQMAATQAdsjKAMn5++++VvxAAecAFGWQACMgAGeJGABCMADMjIAFj44+aO8+IBBCMAClAA//Z",
          postImage:
            "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQAoQMBIgACEQEDEQH/xAAbAAEBAQEBAQEBAAAAAAAAAAAAAQIFBAMGB//EADcQAAIBAwEFBAYJBQAAAAAAAAABAgMEESEFMUFRYRIiMnFCUmKBkfATFSM0coKhscEUJNHh8f/EABUBAQEAAAAAAAAAAAAAAAAAAAAB/8QAFhEBAQEAAAAAAAAAAAAAAAAAABEB/9oADAMBAAIRAxEAPwD+uAAqAAAAAAAAAAAAAAAAAe4EbAGSsgBmWVkAZBCAfcAAAAAAKBD5XFxTt45qS37lxPnfXatod3DqPwrl1Zw6k5VJuU5OTe9sD3Vtq1JPFGKgub1bPNK7uZPWtP3PB8AB9ld3Ed1eb956aW1K0X9olNfBngAH6C2u6VwsU33vUe//AGffJ+ZUnFpxeGtzR2LC9+nzTq6VVu9pAe1sjHAgAgIwBllyRgMohAB6QAAAAAlSUYQlKe6Kyynh2vPs2qgm+/LD8vnAHKr1pV6sqk97PmAUAAAAAARk4SUovEk8pkZAP0VvWVejGotMrVcmbObsao2qlJ7k1JfPwOlkgjICZAGW9QyNgM+QIAPWAAAAAHL22+9SXRnUObtmHcpT5Nr4gcoAFAAAAQjANkAA9uyH/ctew/4OucrY8c1qkuCjj4/8OqyCMy2Vsy2AMsMyBQZAHvAAAAAD43lH6e2nBLXGY+Z9gB+Y6PgDo7UtHCUq9Nd2XixwZztxcAAgEyAQAQfqeqwtXWmpSTVOO/q+QHQ2bRdK2TktZvtf4PS2P2I2QRsmQzLYBsyyszIBkGc9EAOkAAAAAAABo8prRnKu9mtNztln2OXkdOpUhSj2qk1FdWeKe1LdT7Pfa9bG4Djyi4NxkmmuDMs/QKrbXUd9OfR7z5y2dbS9BrykxRwv0C1eFq3yR2/q624wb85M3m3to6OnT6/Ooo59ts6c2p18wjy4s6kYxpwUYLEVuSPH9Z26n2e/j1uyeinWp1lmlOMveBtmSsy2AbMsNkbwBGzLYbI2BMlJgAdQAAAAAOfebSUMwoYlJb5PgY2peNN0KTx67X7HKA1UnOpLtVJOT5swytkKIzarVY+GrJfmZggG5VqsvFVm/wAzPnxyCMBkKTi8xbT6EIB0bbaLWI19eU1/J0Mp6pprmfnW9T12F26clSqP7NvRv0SDrMw2VvJlgRsjYbM5AuhCZQA7AAAHxvK/9Pbyn6W6K6n2OTtmq3VhTW5LL8wOc228ve9SMZIUCAgAhWZAEZcmQBGw2ZANmXuwVmQOzs+v9NQSlrOGj69T7s5OzanYuVHhNYOpkgEZTLAuvME97AHZAAA4G0Zdq9qdHg7zZ+evvvlb8QHwZCkKIAQAyMGQDI9Ssy2BGTJTLAEYbMgbpS7NWm+Ukd1n5+Hjj5o77ZBGQMAATQAdsjKAMn5++++VvxAAecAFGWQACMgAGeJGABCMADMjIAFj44+aO8+IBBCMAClAA//Z",
          likes: 150,
          timePosted: "8 hours ago",
        },
        {
          id: "2",
          username: "Hola",
          profileImage:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUrcSSAflJfljmHCgZi7cMx7kjtYZSj8V1Qw&s",
          postImage:
            "data:image/jpeg;base64,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",
          likes: 150,
          timePosted: "8 hours ago",
        },
      ]);
    }, 2000);
  });
};

export default function Home() {
  const { logout } = useAuth();

  const {
    data: posts,
    error,
    isLoading,
    isFetching,
    refetch,
  } = useQuery("posts", getPosts, { refetchOnWindowFocus: false });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Snapsi</Text>
        <PulsateButton onPress={logout}>
          <Ionicons name="log-out-outline" style={styles.logoutIcon} />
        </PulsateButton>
      </View>

      {isLoading ? (
        <Loader />
      ) : (
        <FlatList
          data={posts}
          renderItem={({ item }) => <Post post={item} />}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ gap: 20, paddingBottom: 70 }}
          refreshControl={
            <RefreshControl
              refreshing={isFetching}
              onRefresh={refetch}
              colors={[COLORS.primary]}
              progressBackgroundColor={COLORS.background}
              tintColor={COLORS.primary}
            />
          }
          ListHeaderComponent={<StoriesContainer />}
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
  logoutIcon: {
    color: COLORS.text,
    fontSize: 24,
  },
});
