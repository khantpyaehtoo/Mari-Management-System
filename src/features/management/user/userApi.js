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

        getDetailUser: builder.query({
            query: (id) => ({
                url: `admin/${userEndpoint}/${id}/detail`,
                method: "GET",
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
            query: (id) => ({
                url: `admin/${userEndpoint}/${id}/block`,
                method: "POST",
            }),
            invalidatesTags: ["customers", "block"],
        }),
    }),
});

export const {
    useGetAllUserDataQuery,
    useGetDetailUserQuery,
    useBlockUserMutation,
    useGetBlockUserDataQuery,
} = userApi;
