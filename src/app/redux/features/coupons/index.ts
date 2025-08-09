import { createApi } from "@reduxjs/toolkit/query/react";

import { API_BASE_URL } from "@/constants";
import { createBaseQueryWithAuth } from "@/lib/utils";
import type { Coupon } from "@/types";

export const couponApi = createApi({
    reducerPath: "couponApi",
    baseQuery: createBaseQueryWithAuth(`${API_BASE_URL}/coupons`),
    tagTypes: ["Coupons"],
    endpoints: (builder) => ({
        getCoupons: builder.query<Coupon[], void>({
            query: () => "/",

            transformResponse: (response: { data: { coupons: Coupon[] } }) => response.data.coupons,

            providesTags: (result) => result ? [
                ...result.map(coupon => ({ type: "Coupons" as const, id: coupon._id })), { type: "Coupons", id: "LIST" }
            ] : [{ type: "Coupons", id: "LIST" }]
        }),

        getCouponById: builder.query<Coupon, Pick<Coupon, "_id">>({
            query: ({ _id }) => `/${_id}`,

            transformResponse: (response: { data: { coupon: Coupon } }) => response.data.coupon,

            providesTags: (result, error, { _id }) => [{ type: "Coupons", id: _id }]
        }),

        createCoupon: builder.mutation<Coupon, Omit<Coupon, "_id" | "usageCount">>({
            query: (coupon) => ({
                url: "/",
                method: "POST",
                body: coupon
            }),

            transformResponse: (response: { data: { coupon: Coupon } }) => response.data.coupon,

            invalidatesTags: [{ type: "Coupons", id: "LIST" }],

            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                const patchResults = [];

                try {
                    const response = await queryFulfilled;
                    patchResults.push(
                        dispatch(couponApi.util.updateQueryData("getCoupons", undefined, (draft) => {
                            draft.unshift(response.data)
                        }))
                    )
                } catch (error) {
                    console.error("Error in Create Coupon");
                    patchResults.forEach(patch => patch.undo());
                }

            },
        }),

        deleteCoupon: builder.mutation<Coupon, Pick<Coupon, "_id">>({
            query: ({ _id }) => ({
                url: `/${_id}`,
                method: "DELETE",
            }),

            invalidatesTags: (result, undefined, { _id }) => [{ type: "Coupons", id: _id }],

            async onQueryStarted({ _id }, { dispatch, queryFulfilled }) {
                const patchResults = [];

                try {
                    patchResults.push(
                        dispatch(couponApi.util.updateQueryData("getCoupons", undefined, (draft) => {
                            const index = draft.findIndex((coupon) => coupon._id === _id);
                            if (index !== -1) {
                                draft.splice(index, 1);
                            }
                        }))
                    )

                    await queryFulfilled;
                } catch (error) {
                    console.error("Error in Delete Coupon");
                    patchResults.forEach(patch => patch.undo());
                }
            }
        }),

        updateCoupon: builder.mutation<Coupon, { id: string, coupon: Partial<Coupon> }>({
            query: ({ id, coupon }) => ({
                url: `/${id}`,
                method: "PATCH",
                body: coupon
            }),

            transformResponse: (response: { data: { coupon: Coupon } }) => response.data.coupon,

            invalidatesTags: (result, undefined, { id }) => [{ type: "Coupons", id }],

            async onQueryStarted({ id, coupon }, { dispatch, queryFulfilled }) {
                const patchResults = [];

                try {

                    patchResults.push(
                        dispatch(couponApi.util.updateQueryData("getCouponById", { _id: id }, (draft) => {
                            Object.assign(draft, coupon);
                        }))
                    )

                    // Update Optimistic (you'll see fallback occurs in UI)
                    patchResults.push(
                        dispatch(couponApi.util.updateQueryData("getCoupons", undefined, (draft) => {
                            const index = draft.findIndex((coupon) => coupon._id === id);
                            if (index !== -1) {
                                Object.assign(draft[index], coupon);
                            }
                        }))
                    )

                    await queryFulfilled;
                } catch (error) {
                    console.error("Error in Update Coupon");
                    patchResults.forEach(patch => patch.undo());
                }
            }
        }),
    })
})


export const { useCreateCouponMutation, useGetCouponsQuery, useGetCouponByIdQuery, useDeleteCouponMutation, useUpdateCouponMutation } = couponApi;