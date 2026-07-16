import { baseApi } from "../../../app/core/baseApi";
const userEndpoint = "customers";

// admin/staffs
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
    useGetAllUserDataQuery,
    useBlockUserMutation,
    useGetBlockUserDataQuery,
} = userApi;
