import { axiosInstance } from ".."

export const fetchCoupons = async (token: string) => {
    const response = await axiosInstance.get("/coupons", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    return response.data.data.coupons;
}

export const createCoupon = async (data: any, token: string) => {
    const response = await axiosInstance.post("/coupons", data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    return response.data.data;
}