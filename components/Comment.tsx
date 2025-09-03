import { COLORS } from "@/constants/theme";
import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";

export default function Comment({ comment }) {
  return (
    <View style={styles.container}>
      {/* <Link href="#"> */}
      <Image
        style={styles.profileImage}
        source={{
          uri: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQAoQMBIgACEQEDEQH/xAAbAAEBAQEBAQEBAAAAAAAAAAAAAQIFBAMGB//EADcQAAIBAwEFBAYJBQAAAAAAAAABAgMEESEFMUFRYRIiMnFCUmKBkfATFSM0coKhscEUJNHh8f/EABUBAQEAAAAAAAAAAAAAAAAAAAAB/8QAFhEBAQEAAAAAAAAAAAAAAAAAABEB/9oADAMBAAIRAxEAPwD+uAAqAAAAAAAAAAAAAAAAAe4EbAGSsgBmWVkAZBCAfcAAAAAAKBD5XFxTt45qS37lxPnfXatod3DqPwrl1Zw6k5VJuU5OTe9sD3Vtq1JPFGKgub1bPNK7uZPWtP3PB8AB9ld3Ed1eb956aW1K0X9olNfBngAH6C2u6VwsU33vUe//AGffJ+ZUnFpxeGtzR2LC9+nzTq6VVu9pAe1sjHAgAgIwBllyRgMohAB6QAAAAAlSUYQlKe6Kyynh2vPs2qgm+/LD8vnAHKr1pV6sqk97PmAUAAAAAARk4SUovEk8pkZAP0VvWVejGotMrVcmbObsao2qlJ7k1JfPwOlkgjICZAGW9QyNgM+QIAPWAAAAAHL22+9SXRnUObtmHcpT5Nr4gcoAFAAAAQjANkAA9uyH/ctew/4OucrY8c1qkuCjj4/8OqyCMy2Vsy2AMsMyBQZAHvAAAAAD43lH6e2nBLXGY+Z9gB+Y6PgDo7UtHCUq9Nd2XixwZztxcAAgEyAQAQfqeqwtXWmpSTVOO/q+QHQ2bRdK2TktZvtf4PS2P2I2QRsmQzLYBsyyszIBkGc9EAOkAAAAAAABo8prRnKu9mtNztln2OXkdOpUhSj2qk1FdWeKe1LdT7Pfa9bG4Djyi4NxkmmuDMs/QKrbXUd9OfR7z5y2dbS9BrykxRwv0C1eFq3yR2/q624wb85M3m3to6OnT6/Ooo59ts6c2p18wjy4s6kYxpwUYLEVuSPH9Z26n2e/j1uyeinWp1lmlOMveBtmSsy2AbMsNkbwBGzLYbI2BMlJgAdQAAAAAOfebSUMwoYlJb5PgY2peNN0KTx67X7HKA1UnOpLtVJOT5swytkKIzarVY+GrJfmZggG5VqsvFVm/wAzPnxyCMBkKTi8xbT6EIB0bbaLWI19eU1/J0Mp6pprmfnW9T12F26clSqP7NvRv0SDrMw2VvJlgRsjYbM5AuhCZQA7AAAHxvK/9Pbyn6W6K6n2OTtmq3VhTW5LL8wOc228ve9SMZIUCAgAhWZAEZcmQBGw2ZANmXuwVmQOzs+v9NQSlrOGj69T7s5OzanYuVHhNYOpkgEZTLAuvME97AHZAAA4G0Zdq9qdHg7zZ+evvvlb8QHwZCkKIAQAyMGQDI9Ssy2BGTJTLAEYbMgbpS7NWm+Ukd1n5+Hjj5o77ZBGQMAATQAdsjKAMn5++++VvxAAecAFGWQACMgAGeJGABCMADMjIAFj44+aO8+IBBCMAClAA//Z",
        }}
        transition={500}
        contentFit="cover"
        cachePolicy={"memory-disk"}
      />
      {/* </Link> */}
      <View>
        <Text style={[styles.text, styles.username]}>Username</Text>
        <Text style={styles.text}>This is a comment {comment}</Text>
        <Text style={styles.time}>8 hours ago</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 10,
  },
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 50,
  },
  username: {
    fontSize: 13,
    fontWeight: "bold",
  },
  text: {
    color: COLORS.text,
  },
  time: {
    color: COLORS.gray,
    fontSize: 12,
  },
});
