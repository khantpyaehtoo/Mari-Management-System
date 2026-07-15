import { baseApi } from "../../../app/core/baseApi";
const userEndpoint = "customer";

// admin/staffs
export const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getUserData: builder.query({
            query: () => ({
                url: `admin/${userEndpoint}`,
                method: "GET",
            }),
            providesTags: ["staffs"],
        }),

        getBlockUserData: builder.query({
            query: () => ({
                url: `admin/${userEndpoint}/block`,
                method: "GET",
            }),
            providesTags: ["block"],
        }),

        blockUser: builder.mutation({
            query: (customerId) => ({
                url: `admin/${userEndpoint}/${customerId}/block`,
                method: "POST",
            }),
            invalidatesTags: ["staffs"],
        }),
    }),
});

export const {
    useBlockUserMutation,
    useGetUserDataQuery,
    useGetBlockUserDataQuery,
} = userApi;
