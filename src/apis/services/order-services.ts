import { axiosInstance } from "..";

export const fetchOrders = async (token: string) => {
  try {
    const response = await axiosInstance.get("/orders/admin", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    return response.data.data;
  } catch (error) {
    return Promise.reject(
      error instanceof Error ? error.message : "Failed to fetch oreder!"
    );
  }
};
