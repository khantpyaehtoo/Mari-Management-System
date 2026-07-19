import { baseApi } from "../../app/core/baseApi";
const notifications = "notifications";

export const notiApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllNotiHistory: builder.query({
            query: () => ({
                url: `${notifications}`,
                method: "GET",
            }),
            providesTags: ["notifications"],
        }),

        deleteNotiHistory: builder.mutation({
            query: (id) => ({
                url: `${notifications}/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["notifications"],
        }),
    }),
});

export const { useGetAllNotiHistoryQuery, useDeleteNotiHistoryMutation } =
    notiApi;
