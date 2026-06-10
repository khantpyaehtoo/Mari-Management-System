import { baseApi } from "../../../app/core/global/basicApi";
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

        createUser: builder.mutation({
            query: ({ getUserData }) => ({
                url: `admin${userEndpoint}`,
                method: "POST",
                body: getUserData,
            }),
            invalidatesTags: ["staffs"],
        }),

        updateUser: builder.mutation({
            query: ({ getUserData }) => ({
                url: `admin${userEndpoint}`,
                method: "PUT",
                body: getUserData,
            }),
            invalidatesTags: ["staffs"],
        }),

        deleteUser: builder.mutation({
            query: ({ getUserData, token }) => ({
                url: `admin${userEndpoint}`,
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
                body: getUserData,
            }),
            invalidatesTags: ["staffs"],
        }),
    }),
});

export const {
    useCreateUserMutation,
    useGetUserDataQuery,
    useUpdateUserMutation,
    useDeleteUserMutation,
} = userApi;
