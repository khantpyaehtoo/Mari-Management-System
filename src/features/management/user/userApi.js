import { baseApi } from "../../../app/core/baseApi";
const userEndpoint = "customers";

export const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllUserData: builder.query({
            query: ({ status, page = 0, size, search } = {}) => ({
                url: `admin/${userEndpoint}`,
                method: "GET",
                params: {
                    page,
                    size,
                    ...(status && { status }),
                    ...(search && { search }),
                },
            }),
            providesTags: ["customers"],
        }),

        getMetricData: builder.query({
            query: () => ({
                url: `admin/${userEndpoint}/metrics`,
                method: "GET",
            }),
            providesTags: ["metrics"],
        }),

        getDetailUser: builder.query({
            query: (id) => ({
                url: `admin/${userEndpoint}/${id}/detail`,
                method: "GET",
            }),
            providesTags: (result, error, id) => [{ type: "customers", id }],
        }),

        getBlockUserData: builder.query({
            query: () => ({
                url: `admin/${userEndpoint}/blocked`,
                method: "GET",
            }),
            providesTags: ["blocked"],
        }),

        blockUser: builder.mutation({
            query: (id) => ({
                url: `users/${id}/block`,
                method: "PUT",
            }),
            invalidatesTags: ["customers", "blocked", "metrics"],
        }),

        unblockUser: builder.mutation({
            query: (id) => ({
                url: `users/${id}/unblock`,
                method: "PUT",
            }),
            invalidatesTags: ["customers", "blocked", "metrics"],
        }),
    }),
});

export const {
    useGetAllUserDataQuery,
    useGetMetricDataQuery,
    useGetDetailUserQuery,
    useGetBlockUserDataQuery,
    useBlockUserMutation,
    useUnblockUserMutation,
} = userApi;
