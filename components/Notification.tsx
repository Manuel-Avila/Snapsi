import { COLORS } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Notification({ notification }) {
  return (
    <Link href="#" asChild>
      <TouchableOpacity style={styles.container} activeOpacity={1}>
        <Link href="/(tabs)/profile" asChild>
          <TouchableOpacity style={styles.profileImageContainer}>
            <Image
              style={styles.profileImage}
              source={{
                uri: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQAoQMBIgACEQEDEQH/xAAbAAEBAQEBAQEBAAAAAAAAAAAAAQIFBAMGB//EADcQAAIBAwEFBAYJBQAAAAAAAAABAgMEESEFMUFRYRIiMnFCUmKBkfATFSM0coKhscEUJNHh8f/EABUBAQEAAAAAAAAAAAAAAAAAAAAB/8QAFhEBAQEAAAAAAAAAAAAAAAAAABEB/9oADAMBAAIRAxEAPwD+uAAqAAAAAAAAAAAAAAAAAe4EbAGSsgBmWVkAZBCAfcAAAAAAKBD5XFxTt45qS37lxPnfXatod3DqPwrl1Zw6k5VJuU5OTe9sD3Vtq1JPFGKgub1bPNK7uZPWtP3PB8AB9ld3Ed1eb956aW1K0X9olNfBngAH6C2u6VwsU33vUe//AGffJ+ZUnFpxeGtzR2LC9+nzTq6VVu9pAe1sjHAgAgIwBllyRgMohAB6QAAAAAlSUYQlKe6Kyynh2vPs2qgm+/LD8vnAHKr1pV6sqk97PmAUAAAAAARk4SUovEk8pkZAP0VvWVejGotMrVcmbObsao2qlJ7k1JfPwOlkgjICZAGW9QyNgM+QIAPWAAAAAHL22+9SXRnUObtmHcpT5Nr4gcoAFAAAAQjANkAA9uyH/ctew/4OucrY8c1qkuCjj4/8OqyCMy2Vsy2AMsMyBQZAHvAAAAAD43lH6e2nBLXGY+Z9gB+Y6PgDo7UtHCUq9Nd2XixwZztxcAAgEyAQAQfqeqwtXWmpSTVOO/q+QHQ2bRdK2TktZvtf4PS2P2I2QRsmQzLYBsyyszIBkGc9EAOkAAAAAAABo8prRnKu9mtNztln2OXkdOpUhSj2qk1FdWeKe1LdT7Pfa9bG4Djyi4NxkmmuDMs/QKrbXUd9OfR7z5y2dbS9BrykxRwv0C1eFq3yR2/q624wb85M3m3to6OnT6/Ooo59ts6c2p18wjy4s6kYxpwUYLEVuSPH9Z26n2e/j1uyeinWp1lmlOMveBtmSsy2AbMsNkbwBGzLYbI2BMlJgAdQAAAAAOfebSUMwoYlJb5PgY2peNN0KTx67X7HKA1UnOpLtVJOT5swytkKIzarVY+GrJfmZggG5VqsvFVm/wAzPnxyCMBkKTi8xbT6EIB0bbaLWI19eU1/J0Mp6pprmfnW9T12F26clSqP7NvRv0SDrMw2VvJlgRsjYbM5AuhCZQA7AAAHxvK/9Pbyn6W6K6n2OTtmq3VhTW5LL8wOc228ve9SMZIUCAgAhWZAEZcmQBGw2ZANmXuwVmQOzs+v9NQSlrOGj69T7s5OzanYuVHhNYOpkgEZTLAuvME97AHZAAA4G0Zdq9qdHg7zZ+evvvlb8QHwZCkKIAQAyMGQDI9Ssy2BGTJTLAEYbMgbpS7NWm+Ukd1n5+Hjj5o77ZBGQMAATQAdsjKAMn5++++VvxAAecAFGWQACMgAGeJGABCMADMjIAFj44+aO8+IBBCMAClAA//Z",
              }}
              cachePolicy="memory-disk"
              transition={500}
              contentFit="cover"
            />
            <Ionicons name="heart" style={styles.icon} />
          </TouchableOpacity>
        </Link>
        <View style={styles.notificationDetails}>
          <Link href="/(tabs)/create" asChild>
            <TouchableOpacity>
              <Text style={styles.username}>manuel_avilam</Text>
            </TouchableOpacity>
          </Link>
          <Text style={styles.notificationInfo}>
            commented: &quot;How Big&quot;
          </Text>
          <Text style={styles.timestamp}>8 hours ago</Text>
        </View>
        <Image
          style={styles.postImage}
          source={{
            uri: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQAoQMBIgACEQEDEQH/xAAbAAEBAQEBAQEBAAAAAAAAAAAAAQIFBAMGB//EADcQAAIBAwEFBAYJBQAAAAAAAAABAgMEESEFMUFRYRIiMnFCUmKBkfATFSM0coKhscEUJNHh8f/EABUBAQEAAAAAAAAAAAAAAAAAAAAB/8QAFhEBAQEAAAAAAAAAAAAAAAAAABEB/9oADAMBAAIRAxEAPwD+uAAqAAAAAAAAAAAAAAAAAe4EbAGSsgBmWVkAZBCAfcAAAAAAKBD5XFxTt45qS37lxPnfXatod3DqPwrl1Zw6k5VJuU5OTe9sD3Vtq1JPFGKgub1bPNK7uZPWtP3PB8AB9ld3Ed1eb956aW1K0X9olNfBngAH6C2u6VwsU33vUe//AGffJ+ZUnFpxeGtzR2LC9+nzTq6VVu9pAe1sjHAgAgIwBllyRgMohAB6QAAAAAlSUYQlKe6Kyynh2vPs2qgm+/LD8vnAHKr1pV6sqk97PmAUAAAAAARk4SUovEk8pkZAP0VvWVejGotMrVcmbObsao2qlJ7k1JfPwOlkgjICZAGW9QyNgM+QIAPWAAAAAHL22+9SXRnUObtmHcpT5Nr4gcoAFAAAAQjANkAA9uyH/ctew/4OucrY8c1qkuCjj4/8OqyCMy2Vsy2AMsMyBQZAHvAAAAAD43lH6e2nBLXGY+Z9gB+Y6PgDo7UtHCUq9Nd2XixwZztxcAAgEyAQAQfqeqwtXWmpSTVOO/q+QHQ2bRdK2TktZvtf4PS2P2I2QRsmQzLYBsyyszIBkGc9EAOkAAAAAAABo8prRnKu9mtNztln2OXkdOpUhSj2qk1FdWeKe1LdT7Pfa9bG4Djyi4NxkmmuDMs/QKrbXUd9OfR7z5y2dbS9BrykxRwv0C1eFq3yR2/q624wb85M3m3to6OnT6/Ooo59ts6c2p18wjy4s6kYxpwUYLEVuSPH9Z26n2e/j1uyeinWp1lmlOMveBtmSsy2AbMsNkbwBGzLYbI2BMlJgAdQAAAAAOfebSUMwoYlJb5PgY2peNN0KTx67X7HKA1UnOpLtVJOT5swytkKIzarVY+GrJfmZggG5VqsvFVm/wAzPnxyCMBkKTi8xbT6EIB0bbaLWI19eU1/J0Mp6pprmfnW9T12F26clSqP7NvRv0SDrMw2VvJlgRsjYbM5AuhCZQA7AAAHxvK/9Pbyn6W6K6n2OTtmq3VhTW5LL8wOc228ve9SMZIUCAgAhWZAEZcmQBGw2ZANmXuwVmQOzs+v9NQSlrOGj69T7s5OzanYuVHhNYOpkgEZTLAuvME97AHZAAA4G0Zdq9qdHg7zZ+evvvlb8QHwZCkKIAQAyMGQDI9Ssy2BGTJTLAEYbMgbpS7NWm+Ukd1n5+Hjj5o77ZBGQMAATQAdsjKAMn5++++VvxAAecAFGWQACMgAGeJGABCMADMjIAFj44+aO8+IBBCMAClAA//Z",
          }}
          cachePolicy="memory-disk"
          transition={500}
          contentFit="cover"
        />
      </TouchableOpacity>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 10,
  },
  profileImageContainer: {
    position: "relative",
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  icon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    fontSize: 14,
    color: COLORS.primary,
    backgroundColor: COLORS.background,
    borderRadius: 25,
    padding: 2,
  },
  notificationDetails: {
    flex: 1,
  },
  username: {
    fontWeight: "bold",
    color: COLORS.text,
  },
  notificationInfo: {
    fontSize: 13,
    color: COLORS.gray,
  },
  timestamp: {
    fontSize: 11,
    color: COLORS.gray,
  },
  postImage: {
    width: 50,
    height: 50,
  },
});
