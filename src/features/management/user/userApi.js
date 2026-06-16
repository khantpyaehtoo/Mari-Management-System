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

        createUser: builder.mutation({
            query: (body) => ({
                url: `admin${userEndpoint}`,
                method: "POST",
                body,
            }),
            invalidatesTags: ["staffs"],
        }),

        updateUser: builder.mutation({
            query: ({ id, token }) => ({
                url: `admin${userEndpoint}/${id}`,
                method: "PUT",
                headers: { Authorization: `Bearer ${token}` },
            }),
            invalidatesTags: ["staffs"],
        }),

        deleteUser: builder.mutation({
            query: ({ id, token }) => ({
                url: `admin${userEndpoint}/${id}`,
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
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
