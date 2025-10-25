import PostsContainer from "@/components/PostsContainer";
import ProfileInformation from "@/components/ProfileInformation";
import PulsateButton from "@/components/ui/PulsateButton";
import { COLORS } from "@/constants/theme";
import { StyleSheet, Text, View } from "react-native";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
import type { UserProfile } from "@/types/IUserProfile";
import { usePost } from "@/hooks/usePost";
import { IPost } from "@/types/IPost";
import Loader from "@/components/Loader";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useUser } from "@/hooks/useUser";
import Toast from "react-native-toast-message";
import { useEffect } from "react";

export default function Profile() {
  const { followUser, unfollowUser, getProfile } = useUser();
  const { username } = useLocalSearchParams();
  const { getUserPosts } = usePost();
  const router = useRouter();
  const queryClient = useQueryClient();

  useEffect(() => {
    const currentUser: UserProfile | undefined =
      queryClient.getQueryData("myProfile");
    if (username === currentUser?.username) {
      router.replace("/(tabs)/profile");
    }
  }, [username, queryClient]);

  const {
    data: profileInfo,
    isLoading: isProfileLoading,
    refetch: refetchProfile,
  } = useQuery<UserProfile>(["user", username], getProfile, {
    enabled: !!username,
  });
  const {
    data: postsData,
    isLoading: arePostsLoading,
    hasNextPage: postsHasNextPage,
    fetchNextPage: fetchPostsNextPage,
    isFetchingNextPage: arePostsFetchingNextPage,
    refetch: refetchPosts,
    isFetching: arePostsFetching,
  } = useInfiniteQuery(["posts", username], getUserPosts, {
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    enabled: !!username,
  });

  const posts: IPost[] = postsData?.pages?.flatMap((page) => page.posts) ?? [];

  const { mutate: follow } = useMutation({
    mutationFn: followUser,
    onSuccess: refetchProfile,
    onError: (error) => {
      Toast.show({
        type: "error",
        text1: "Error following user",
        text2: "Failed to follow the user. Please try again.",
      });
    },
  });

  const { mutate: unfollow } = useMutation({
    mutationFn: unfollowUser,
    onSuccess: refetchProfile,
    onError: (error) => {
      Toast.show({
        type: "error",
        text1: "Error unfollowing user",
        text2: "Failed to unfollow the user. Please try again.",
      });
    },
  });

  const handleToggleFollow = () => {
    let mutationFn;

    mutationFn = profileInfo?.is_followed ? unfollow : follow;

    if (mutationFn && profileInfo?.id) {
      mutationFn(profileInfo?.id);
    }
  };

  if (isProfileLoading) {
    return <Loader />;
  }

  const renderContent = () => {
    if (arePostsLoading) {
      return <Loader />;
    }

    return (
      <PostsContainer
        data={posts}
        refetch={refetchPosts}
        fetchNextPage={fetchPostsNextPage}
        hasNextPage={postsHasNextPage}
        isFetchingNextPage={arePostsFetchingNextPage}
        isFetching={arePostsFetching}
        noDataIcon="camera-outline"
        noDataMessage="No posts yet"
      />
    );
  };

  return (
    <View style={styles.container}>
      <PulsateButton
        onPress={() => router.back()}
        style={styles.arrowBackContainer}
        scaleOnPress={0.7}
      >
        <Ionicons name="arrow-back-outline" style={styles.icon} />
      </PulsateButton>
      <Text style={styles.title}>{profileInfo?.username}</Text>
      <ProfileInformation profileInfo={profileInfo} />
      <PulsateButton
        onPress={handleToggleFollow}
        style={[
          styles.button,
          profileInfo?.is_followed
            ? styles.unfollowButton
            : styles.followButton,
        ]}
      >
        <Text style={styles.buttonText}>
          {profileInfo?.is_followed ? "Unfollow" : "Follow"}
        </Text>
      </PulsateButton>

      <View style={styles.flex}>{renderContent()}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
    backgroundColor: COLORS.background,
  },
  arrowBackContainer: {
    position: "absolute",
    top: 30,
    left: 20,
    zIndex: 1,
  },
  icon: {
    color: COLORS.text,
    fontSize: 30,
  },
  title: {
    color: COLORS.text,
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 30,
  },
  flex: {
    flex: 1,
  },
  button: {
    marginHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 5,
  },
  followButton: {
    backgroundColor: COLORS.primary,
  },
  unfollowButton: {
    backgroundColor: COLORS.buttonBackground,
  },
  buttonText: {
    color: COLORS.text,
    textAlign: "center",
  },
});
