import { baseApi } from "../../../app/core/basicApi";
const userEndpoint = "/staffs";
// admin/staffs
export const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getUserData: builder.query({
            query: () => ({
                url: `admin${userEndpoint}`,
                method: "GET",
            }),
            providesTags: ["staffs"],
        }),

        blockUser: builder.mutation({
            query: (customerId) => ({
                url: `admin${userEndpoint}/${customerId}/block`,
                method: "POST",
            }),
            invalidatesTags: ["staffs"],
        }),
    }),
});

export const { useBlockUserMutation, useGetUserDataQuery } = userApi;
