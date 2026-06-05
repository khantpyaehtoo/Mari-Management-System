import { baseApi } from "../../../app/core/global/basicApi";
const userEndpoint = "/users";

export const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getUserData: builder.query({
            query: (token) => ({
                url: `${userEndpoint}`,
                method: "GET",
                heades: { Authorization: `Bearer ${token}` },
            }),
            providesTags: ["users"],
        }),

        createUser: builder.mutation({
            query: ({ getUserData, token }) => ({
                url: `${userEndpoint}`,
                method: "POST",
                body: getUserData,
                header: { Authorization: `Bearer ${token}` },
            }),
            invalidatesTags: ["users"],
        }),

        updateUser: builder.mutation({
            query: ({ getUserData }) => ({
                url: `${userEndpoint}`,
                method: "PUT",
                body: getUserData,
            }),
            invalidatesTags: ["users"],
        }),

        deleteUser: builder.mutation({
            query: ({ getUserData, token }) => ({
                url: `${userEndpoint}`,
                method: "DELETE",
                header: { Authorization: `Bearer ${token}` },
                body: getUserData,
            }),
            invalidatesTags: ["users"],
        }),
    }),
});

export const {
    useCreateUserMutation,
    useGetUserDataQuery,
    useUpdateUserMutation,
    useDeleteUserMutation,
} = userApi;
