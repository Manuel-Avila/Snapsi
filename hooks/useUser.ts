import api from "@/api/apiClient";
import { UserProfile } from "@/types/IUserProfile";

export const useUser = () => {
  const getProfile = async ({ queryKey }): Promise<UserProfile> => {
    const [_key, username] = queryKey;
    const response = await api.get(`/user/${username}`);

    return response.data?.user;
  };

  const followUser = async (id: number) => {
    const response = await api.post(`/user/${id}/follow`);
    return response.data;
  };

  const unfollowUser = async (id: number) => {
    const response = await api.delete(`/user/${id}/follow`);
    return response.data;
  };

  return { getProfile, followUser, unfollowUser };
};
