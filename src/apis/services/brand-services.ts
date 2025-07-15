import { axiosInstance } from "..";

export const fetchBrands = async () => {
  try {
    const response = await axiosInstance.get("/brands");
    return response.data.data.brands || [];
  } catch (error) {
    return Promise.reject(
      error instanceof Error ? error.message : "Failed to fetch Brands!"
    );
  }
};

export const createBrand = async (data: any, token: string) => {
  try {
    const response = await axiosInstance.post(`/brands`, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }) 

    return response.data;
  } catch (error) {
    const message = error instanceof Error? error.message: error as any;
    console.log(message);
    throw new Error(message || "Failed to create brand");
  }
}
