import EditProfileModal from "@/components/Modals/EditProfileModal";
import PostsContainer from "@/components/PostsContainer";
import ProfileInformation from "@/components/ProfileInformation";
import PulsateButton from "@/components/ui/PulsateButton";
import { COLORS } from "@/constants/theme";
import { useAuth } from "@/context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useInfiniteQuery, useQuery } from "react-query";
import type { UserProfile } from "@/types/IProfile";
import { usePost } from "@/hooks/usePost";
import { IPost } from "@/types/IPost";
import Loader from "@/components/Loader";

export default function Profile() {
  const { logout } = useAuth();
  const { getUserPosts } = usePost();
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const { data: myProfile, isLoading: isProfileLoading } =
    useQuery<UserProfile>(["myProfile"]);
  const {
    data: postsData,
    isLoading: arePostsLoading,
    refetch: refetchPosts,
    isFetching: arePostsFetching,
  } = useInfiniteQuery(["posts", myProfile?.username], getUserPosts, {
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    enabled: !!myProfile?.username,
    refetchOnWindowFocus: false,
  });

  const handleOpenEditModal = () => setIsEditModalVisible(true);
  const handleCloseEditModal = () => setIsEditModalVisible(false);

  const posts: IPost[] = postsData?.pages.flatMap((page) => page.posts) ?? [];

  if (isProfileLoading) {
    return <Loader />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{myProfile?.username}</Text>
        <PulsateButton onPress={logout}>
          <Ionicons name="log-out-outline" style={styles.logoutIcon} />
        </PulsateButton>
      </View>
      <ProfileInformation profileInfo={myProfile} />
      <PulsateButton style={styles.editButton} onPress={handleOpenEditModal}>
        <Text style={styles.editButtonText}>Edit Profile</Text>
      </PulsateButton>

      <View style={styles.flex}>
        {arePostsLoading ? (
          <Loader />
        ) : (
          <PostsContainer
            data={posts}
            refetch={refetchPosts}
            isFetching={arePostsFetching}
            noDataIcon="camera-outline"
            noDataMessage="No posts yet"
          />
        )}
      </View>

      <EditProfileModal
        isVisible={isEditModalVisible}
        onClose={handleCloseEditModal}
        profileData={myProfile}
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
  editButton: {
    marginHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: COLORS.buttonBackground,
  },
  editButtonText: {
    color: COLORS.text,
    textAlign: "center",
  },
  flex: {
    flex: 1,
  },
});
