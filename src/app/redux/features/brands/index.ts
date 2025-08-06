import { API_BASE_URL } from "@/constants";
import { createBaseQueryWithAuth } from "@/lib/utils";
import type { Brand } from "@/types/brands";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const brandApi = createApi({
  reducerPath: "brandApi",
  baseQuery: createBaseQueryWithAuth(`${API_BASE_URL}/brands`),

  tagTypes: ["Brand"],

  endpoints: (builder) => ({
    getBrands: builder.query<Brand[], void>({
      query: () => "/",
      transformResponse: (response: { data: { brands: Brand[] } }) => response.data.brands,

      providesTags: (result, error, arg, meta) => result ? [
        ...result.map(({ _id }) => ({ type: "Brand" as const, id: _id })),
        { type: "Brand" as const, id: "LIST" }
      ] : [{ type: "Brand" as const, id: "LIST" }],
    }),

    getBrandById: builder.query<Brand, Pick<Brand, "_id">>({
      query: ({ _id }) => `/${_id}`,
      providesTags: (result, error, { _id }) => [{ type: "Brand", id: _id }],
      transformResponse: (response: { data: { brand: Brand } }) => response.data.brand
    }),

    createBrand: builder.mutation<Brand, Omit<Omit<Brand, "_id">, "slug">>({
      query: (brand) => ({
        url: "/",
        method: "POST",
        body: brand,
        // headers: {
        //   "Content-Type": "multipart/form-data",
        // },
      }),

      invalidatesTags: [{ type: "Brand", id: "LIST" }],

      async onQueryStarted(brand, { queryFulfilled, dispatch }) {
        const patchResults: any[] = [];

        try {
          const { data } = await queryFulfilled;
          // dispatch(brandApi.util.invalidateTags([{ type: "Brand", id: "LIST" }]));
          // dispatch(brandApi.util.invalidateTags([{ type: "Brand", id: data._id }]));
          patchResults.push(
            dispatch(brandApi.util.updateQueryData("getBrands", undefined, (draft) => {
              draft.unshift(data);
            }))
          )


        } catch (error) {
          console.error(error);
          patchResults.forEach((patch) => patch.undo())
        }
      }
    }),

    updateBrand: builder.mutation<Brand, { id: string, brand: Partial<Brand> }>({
      query: ({ id, brand }) => ({
        url: `/${id}`,
        method: "PATCH",
        body: brand,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Brand", id }],

      async onQueryStarted({ id, brand }, { queryFulfilled, dispatch }) {
        const patchResults: any[] = [];

        patchResults.push(
          dispatch(brandApi.util.updateQueryData("getBrandById", { _id: id }, (draft) => {
            Object.assign(draft, brand);
          }))
        )

        try {
          await queryFulfilled;
        } catch (error) {
          patchResults.forEach((patch) => patch.undo());
          console.error(error);
        }
      }
    }),

    deleteBrand: builder.mutation<void, Pick<Brand, "_id">>({
      query: ({ _id }) => ({
        url: `/${_id}`, // try to change this url, and see errors
        method: "DELETE",
      }),

      invalidatesTags: (result, error, { _id }) => [{ type: "Brand", id: "LIST" }, { type: "Brand", id: _id }],

      async onQueryStarted({ _id }, { queryFulfilled, dispatch }) {
        const patchResults: any[] = [];

        patchResults.push(
          dispatch(brandApi.util.updateQueryData("getBrands", undefined, (draft) => {
            const index = draft.findIndex((brand) => brand._id === _id);
            if (index !== -1) {
              draft.splice(index, 1);
            }
          })
          )
        )

        try {
          await queryFulfilled;
        } catch (error) {
          console.error(error);
          patchResults.forEach(patch => patch.undo());
        }
      },
    })
  })
})

export const {
  useGetBrandsQuery,
  useGetBrandByIdQuery,
  useCreateBrandMutation,
  useUpdateBrandMutation,
  useDeleteBrandMutation,
} = brandApi;