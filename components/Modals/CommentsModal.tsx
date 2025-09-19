import { COLORS } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Comment from "../Comment";

type props = {
  visible: boolean;
  onClose: () => void;
};

export default function CommentsModal({ visible, onClose }: props) {
  const comments = [1, 2, 3, 4, 5, 5, 6, 7, 8];

  const [newComment, setNewComment] = useState("");

  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
      transparent={true}
    >
      <KeyboardAvoidingView
        style={styles.overlay}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.container}>
          <View style={styles.center}>
            <View style={styles.topBar} />
            <Text style={styles.title}>Comments</Text>
          </View>

          <FlatList
            data={comments}
            renderItem={({ item }) => <Comment comment={item} />}
            keyExtractor={(_, i) => i.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.commentsList}
          />

          <View style={styles.addCommentContainer}>
            <Image
              style={styles.profileImage}
              source={{
                uri: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQAoQMBIgACEQEDEQH/xAAbAAEBAQEBAQEBAAAAAAAAAAAAAQIFBAMGB//EADcQAAIBAwEFBAYJBQAAAAAAAAABAgMEESEFMUFRYRIiMnFCUmKBkfATFSM0coKhscEUJNHh8f/EABUBAQEAAAAAAAAAAAAAAAAAAAAB/8QAFhEBAQEAAAAAAAAAAAAAAAAAABEB/9oADAMBAAIRAxEAPwD+uAAqAAAAAAAAAAAAAAAAAe4EbAGSsgBmWVkAZBCAfcAAAAAAKBD5XFxTt45qS37lxPnfXatod3DqPwrl1Zw6k5VJuU5OTe9sD3Vtq1JPFGKgub1bPNK7uZPWtP3PB8AB9ld3Ed1eb956aW1K0X9olNfBngAH6C2u6VwsU33vUe//AGffJ+ZUnFpxeGtzR2LC9+nzTq6VVu9pAe1sjHAgAgIwBllyRgMohAB6QAAAAAlSUYQlKe6Kyynh2vPs2qgm+/LD8vnAHKr1pV6sqk97PmAUAAAAAARk4SUovEk8pkZAP0VvWVejGotMrVcmbObsao2qlJ7k1JfPwOlkgjICZAGW9QyNgM+QIAPWAAAAAHL22+9SXRnUObtmHcpT5Nr4gcoAFAAAAQjANkAA9uyH/ctew/4OucrY8c1qkuCjj4/8OqyCMy2Vsy2AMsMyBQZAHvAAAAAD43lH6e2nBLXGY+Z9gB+Y6PgDo7UtHCUq9Nd2XixwZztxcAAgEyAQAQfqeqwtXWmpSTVOO/q+QHQ2bRdK2TktZvtf4PS2P2I2QRsmQzLYBsyyszIBkGc9EAOkAAAAAAABo8prRnKu9mtNztln2OXkdOpUhSj2qk1FdWeKe1LdT7Pfa9bG4Djyi4NxkmmuDMs/QKrbXUd9OfR7z5y2dbS9BrykxRwv0C1eFq3yR2/q624wb85M3m3to6OnT6/Ooo59ts6c2p18wjy4s6kYxpwUYLEVuSPH9Z26n2e/j1uyeinWp1lmlOMveBtmSsy2AbMsNkbwBGzLYbI2BMlJgAdQAAAAAOfebSUMwoYlJb5PgY2peNN0KTx67X7HKA1UnOpLtVJOT5swytkKIzarVY+GrJfmZggG5VqsvFVm/wAzPnxyCMBkKTi8xbT6EIB0bbaLWI19eU1/J0Mp6pprmfnW9T12F26clSqP7NvRv0SDrMw2VvJlgRsjYbM5AuhCZQA7AAAHxvK/9Pbyn6W6K6n2OTtmq3VhTW5LL8wOc228ve9SMZIUCAgAhWZAEZcmQBGw2ZANmXuwVmQOzs+v9NQSlrOGj69T7s5OzanYuVHhNYOpkgEZTLAuvME97AHZAAA4G0Zdq9qdHg7zZ+evvvlb8QHwZCkKIAQAyMGQDI9Ssy2BGTJTLAEYbMgbpS7NWm+Ukd1n5+Hjj5o77ZBGQMAATQAdsjKAMn5++++VvxAAecAFGWQACMgAGeJGABCMADMjIAFj44+aO8+IBBCMAClAA//Z",
              }}
              contentFit="cover"
              transition={500}
              cachePolicy="memory-disk"
            />
            <TextInput
              style={styles.input}
              placeholder="Add a comment"
              value={newComment}
              onChangeText={setNewComment}
              placeholderTextColor={COLORS.gray}
            />
            <TouchableOpacity
              style={[styles.sendButton, !newComment.trim() && styles.hide]}
            >
              <Ionicons
                style={styles.sendIcon}
                name="arrow-up-outline"
                size={20}
              />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: COLORS.modalOverlay,
  },
  container: {
    padding: 15,
    gap: 10,
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "80%",
    backgroundColor: COLORS.commentsBackground,
  },
  center: {
    alignItems: "center",
    gap: 10,
  },
  title: {
    color: COLORS.text,
    fontWeight: "bold",
  },
  topBar: {
    height: 4,
    backgroundColor: COLORS.gray,
    width: 40,
  },
  addCommentContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 50,
  },
  input: {
    flex: 1,
    color: COLORS.text,
  },
  sendButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  sendIcon: {
    color: COLORS.text,
  },
  hide: {
    display: "none",
  },
  commentsList: {
    gap: 14,
  },
});
