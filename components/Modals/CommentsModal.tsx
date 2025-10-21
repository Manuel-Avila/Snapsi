import { COLORS } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useState } from "react";
import {
  FlatList,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Comment from "../Comment";
import { Modal } from "../ui/Modal";
import PulsateButton from "../ui/PulsateButton";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
import { usePost } from "@/hooks/usePost";
import Loader from "../Loader";
import NoItems from "../NoItems";
import Toast from "react-native-toast-message";
import { useFormSubmit } from "@/hooks/useFormSubmit";
import { addCommentSchema } from "@/validators/commentValidator";
import { PLACEHOLDER_PROFILE_IMAGE } from "@/constants/assets";
import { UserProfile } from "@/types/IProfile";

type props = {
  isVisible: boolean;
  onClose: () => void;
  postId: number;
};

export default function CommentsModal({ isVisible, onClose, postId }: props) {
  const { getComments, addComment } = usePost();
  const [comment, setComment] = useState("");
  const { submitForm, isSubmitting } = useFormSubmit();
  const queryClient = useQueryClient();

  const { data: myProfile } = useQuery<UserProfile>(["myProfile"]);

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isFetching,
  } = useInfiniteQuery(["comments", postId], getComments, {
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    enabled: !!postId && isVisible,
    refetchOnWindowFocus: false,
  });
  const comments = data?.pages.flatMap((page) => page.comments ?? []);

  const { mutate } = useMutation({
    mutationFn: addComment,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["comments", postId]);
      queryClient.invalidateQueries("posts");
      clearFields();
    },
    onError: (error) => {
      Toast.show({
        type: "error",
        text1: "Error adding comment",
        text2: "Failed to add comment. Please try again.",
      });
    },
  });

  const handleAddComment = () => {
    Keyboard.dismiss();

    const formData = {
      postId,
      comment_text: comment.trim(),
    };

    submitForm(formData, addCommentSchema, mutate);
  };

  const clearFields = () => {
    setComment("");
  };

  return (
    <Modal
      isVisible={isVisible}
      onClose={onClose}
      backdropOpacity={0.5}
      style={styles.modal}
      contentContainerStyle={styles.container}
    >
      <View style={styles.center}>
        <View style={styles.topBar} />
        <Text style={styles.title}>Comments</Text>
      </View>

      <View style={styles.flex}>
        {isLoading && <Loader />}

        {!isLoading && comments?.length === 0 && (
          <NoItems icon="chatbubble-outline" message="No comments yet." />
        )}

        {!isLoading && comments && comments.length > 0 && (
          <FlatList
            data={comments}
            renderItem={({ item }) => (
              <Comment comment={item} onClose={onClose} />
            )}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.commentsListContainer}
            onEndReached={() => {
              if (hasNextPage && !isFetchingNextPage) {
                fetchNextPage();
              }
            }}
            onEndReachedThreshold={0.5}
            ListFooterComponent={isFetchingNextPage ? <Loader /> : null}
          />
        )}
      </View>
      <View style={styles.addCommentContainer}>
        <Image
          style={styles.profileImage}
          source={
            myProfile?.profile_picture_url
              ? { uri: myProfile.profile_picture_url }
              : PLACEHOLDER_PROFILE_IMAGE
          }
          contentFit="cover"
          transition={500}
          cachePolicy="memory-disk"
        />
        <TextInput
          style={styles.input}
          placeholder="Add a comment"
          value={comment}
          onChangeText={setComment}
          placeholderTextColor={COLORS.gray}
        />
        <PulsateButton
          onPress={handleAddComment}
          disabled={isSubmitting || !comment.trim()}
          style={[styles.sendButton, !comment.trim() && styles.hide]}
        >
          <Ionicons style={styles.sendIcon} name="arrow-up-outline" size={20} />
        </PulsateButton>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  container: {
    padding: 15,
    gap: 10,
    width: "100%",
    height: "80%",
    backgroundColor: COLORS.commentsBackground,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
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
    paddingTop: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
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
  commentsListContainer: {
    gap: 14,
  },
  flex: {
    flex: 1,
  },
});
