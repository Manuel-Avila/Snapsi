import PostsContainer from "@/components/PostsContainer";
import ProfileInformation from "@/components/ProfileInformation";
import PulsateButton from "@/components/ui/PulsateButton";
import { COLORS } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function UserProfile() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const posts = [
    {
      url: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQAoQMBIgACEQEDEQH/xAAbAAEBAQEBAQEBAAAAAAAAAAAAAQIFBAMGB//EADcQAAIBAwEFBAYJBQAAAAAAAAABAgMEESEFMUFRYRIiMnFCUmKBkfATFSM0coKhscEUJNHh8f/EABUBAQEAAAAAAAAAAAAAAAAAAAAB/8QAFhEBAQEAAAAAAAAAAAAAAAAAABEB/9oADAMBAAIRAxEAPwD+uAAqAAAAAAAAAAAAAAAAAe4EbAGSsgBmWVkAZBCAfcAAAAAAKBD5XFxTt45qS37lxPnfXatod3DqPwrl1Zw6k5VJuU5OTe9sD3Vtq1JPFGKgub1bPNK7uZPWtP3PB8AB9ld3Ed1eb956aW1K0X9olNfBngAH6C2u6VwsU33vUe//AGffJ+ZUnFpxeGtzR2LC9+nzTq6VVu9pAe1sjHAgAgIwBllyRgMohAB6QAAAAAlSUYQlKe6Kyynh2vPs2qgm+/LD8vnAHKr1pV6sqk97PmAUAAAAAARk4SUovEk8pkZAP0VvWVejGotMrVcmbObsao2qlJ7k1JfPwOlkgjICZAGW9QyNgM+QIAPWAAAAAHL22+9SXRnUObtmHcpT5Nr4gcoAFAAAAQjANkAA9uyH/ctew/4OucrY8c1qkuCjj4/8OqyCMy2Vsy2AMsMyBQZAHvAAAAAD43lH6e2nBLXGY+Z9gB+Y6PgDo7UtHCUq9Nd2XixwZztxcAAgEyAQAQfqeqwtXWmpSTVOO/q+QHQ2bRdK2TktZvtf4PS2P2I2QRsmQzLYBsyyszIBkGc9EAOkAAAAAAABo8prRnKu9mtNztln2OXkdOpUhSj2qk1FdWeKe1LdT7Pfa9bG4Djyi4NxkmmuDMs/QKrbXUd9OfR7z5y2dbS9BrykxRwv0C1eFq3yR2/q624wb85M3m3to6OnT6/Ooo59ts6c2p18wjy4s6kYxpwUYLEVuSPH9Z26n2e/j1uyeinWp1lmlOMveBtmSsy2AbMsNkbwBGzLYbI2BMlJgAdQAAAAAOfebSUMwoYlJb5PgY2peNN0KTx67X7HKA1UnOpLtVJOT5swytkKIzarVY+GrJfmZggG5VqsvFVm/wAzPnxyCMBkKTi8xbT6EIB0bbaLWI19eU1/J0Mp6pprmfnW9T12F26clSqP7NvRv0SDrMw2VvJlgRsjYbM5AuhCZQA7AAAHxvK/9Pbyn6W6K6n2OTtmq3VhTW5LL8wOc228ve9SMZIUCAgAhWZAEZcmQBGw2ZANmXuwVmQOzs+v9NQSlrOGj69T7s5OzanYuVHhNYOpkgEZTLAuvME97AHZAAA4G0Zdq9qdHg7zZ+evvvlb8QHwZCkKIAQAyMGQDI9Ssy2BGTJTLAEYbMgbpS7NWm+Ukd1n5+Hjj5o77ZBGQMAATQAdsjKAMn5++++VvxAAecAFGWQACMgAGeJGABCMADMjIAFj44+aO8+IBBCMAClAA//Z",
    },
    {
      url: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQAoQMBIgACEQEDEQH/xAAbAAEBAQEBAQEBAAAAAAAAAAAAAQIFBAMGB//EADcQAAIBAwEFBAYJBQAAAAAAAAABAgMEESEFMUFRYRIiMnFCUmKBkfATFSM0coKhscEUJNHh8f/EABUBAQEAAAAAAAAAAAAAAAAAAAAB/8QAFhEBAQEAAAAAAAAAAAAAAAAAABEB/9oADAMBAAIRAxEAPwD+uAAqAAAAAAAAAAAAAAAAAe4EbAGSsgBmWVkAZBCAfcAAAAAAKBD5XFxTt45qS37lxPnfXatod3DqPwrl1Zw6k5VJuU5OTe9sD3Vtq1JPFGKgub1bPNK7uZPWtP3PB8AB9ld3Ed1eb956aW1K0X9olNfBngAH6C2u6VwsU33vUe//AGffJ+ZUnFpxeGtzR2LC9+nzTq6VVu9pAe1sjHAgAgIwBllyRgMohAB6QAAAAAlSUYQlKe6Kyynh2vPs2qgm+/LD8vnAHKr1pV6sqk97PmAUAAAAAARk4SUovEk8pkZAP0VvWVejGotMrVcmbObsao2qlJ7k1JfPwOlkgjICZAGW9QyNgM+QIAPWAAAAAHL22+9SXRnUObtmHcpT5Nr4gcoAFAAAAQjANkAA9uyH/ctew/4OucrY8c1qkuCjj4/8OqyCMy2Vsy2AMsMyBQZAHvAAAAAD43lH6e2nBLXGY+Z9gB+Y6PgDo7UtHCUq9Nd2XixwZztxcAAgEyAQAQfqeqwtXWmpSTVOO/q+QHQ2bRdK2TktZvtf4PS2P2I2QRsmQzLYBsyyszIBkGc9EAOkAAAAAAABo8prRnKu9mtNztln2OXkdOpUhSj2qk1FdWeKe1LdT7Pfa9bG4Djyi4NxkmmuDMs/QKrbXUd9OfR7z5y2dbS9BrykxRwv0C1eFq3yR2/q624wb85M3m3to6OnT6/Ooo59ts6c2p18wjy4s6kYxpwUYLEVuSPH9Z26n2e/j1uyeinWp1lmlOMveBtmSsy2AbMsNkbwBGzLYbI2BMlJgAdQAAAAAOfebSUMwoYlJb5PgY2peNN0KTx67X7HKA1UnOpLtVJOT5swytkKIzarVY+GrJfmZggG5VqsvFVm/wAzPnxyCMBkKTi8xbT6EIB0bbaLWI19eU1/J0Mp6pprmfnW9T12F26clSqP7NvRv0SDrMw2VvJlgRsjYbM5AuhCZQA7AAAHxvK/9Pbyn6W6K6n2OTtmq3VhTW5LL8wOc228ve9SMZIUCAgAhWZAEZcmQBGw2ZANmXuwVmQOzs+v9NQSlrOGj69T7s5OzanYuVHhNYOpkgEZTLAuvME97AHZAAA4G0Zdq9qdHg7zZ+evvvlb8QHwZCkKIAQAyMGQDI9Ssy2BGTJTLAEYbMgbpS7NWm+Ukd1n5+Hjj5o77ZBGQMAATQAdsjKAMn5++++VvxAAecAFGWQACMgAGeJGABCMADMjIAFj44+aO8+IBBCMAClAA//Z",
    },
  ];
  const followed = true;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <PulsateButton onPress={() => router.back()}>
          <Ionicons name="arrow-back" style={styles.arrowBackIcon} />
        </PulsateButton>
        <Text style={styles.title}>Username {id}</Text>
      </View>
      <ProfileInformation />
      {followed ? (
        <PulsateButton style={[styles.button, styles.followingButtonColor]}>
          <Text style={styles.buttonText}>Following</Text>
        </PulsateButton>
      ) : (
        <PulsateButton style={[styles.button, styles.followButtonColor]}>
          <Text style={styles.buttonText}>Follow</Text>
        </PulsateButton>
      )}

      <PostsContainer
        data={posts}
        noDataIcon="camera-outline"
        noDataMessage="No posts yet"
      />
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
    alignItems: "center",
  },
  title: {
    marginLeft: 15,
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.text,
  },
  arrowBackIcon: {
    color: COLORS.text,
    fontSize: 24,
  },
  followButtonColor: {
    backgroundColor: COLORS.primary,
  },
  followingButtonColor: {
    backgroundColor: COLORS.buttonBackground,
  },
  button: {
    marginHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: COLORS.primary,
  },
  buttonText: {
    color: COLORS.text,
    textAlign: "center",
  },
});
