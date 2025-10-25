import api from "@/api/apiClient";
import type { INotification } from "@/types/INotification";

type GetMyNotificationsResponse = {
  notifications: INotification[];
  nextCursor: string | null;
};

export const useNotification = () => {
  const getMyNotifications = async ({
    pageParam,
  }): Promise<GetMyNotificationsResponse> => {
    const cursor = pageParam;
    const limit = 10;

    const response = await api.get("/notifications", {
      params: { limit, cursor },
    });

    return response.data;
  };

  return { getMyNotifications };
};
