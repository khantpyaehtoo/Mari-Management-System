import { baseApi } from "../../app/core/basicApi";
const authEndPoint = "/auth";
const settingEndPoint = "profile";

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAdminData: builder.query({
            query: (token) => ({
                url: `${authEndPoint}`,
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            }),
            providesTags: ["auth"],
        }),

        loginAccount: builder.mutation({
            query: (getAdminData) => ({
                url: `${authEndPoint}/login`,
                method: "POST",
                body: getAdminData,
            }),
            invalidatesTags: ["auth"],
        }),

        resetPassword: builder.mutation({
            query: (email) => ({
                url: `${authEndPoint}/reset`,
                method: "PUT",
                body: { email },
            }),
            invalidatesTags: ["auth"],
        }),

        changePassword: builder.mutation({
            query: ({ updatePasswords, token }) => ({
                url: `${authEndPoint}/change-password`,
                method: "PUT",
                headers: { Authorization: `Bearer ${token}` },
                body: updatePasswords,
            }),
            invalidatesTags: ["auth"],
        }),

        getSettings: builder.query({
            query: () => ({
                url: `/users/${settingEndPoint}`,
                method: "GET",
            }),
            providesTags: ["settings"],
        }),

        updateAdminData: builder.mutation({
            query: (adminData) => ({
                url: `${settingEndPoint}`,
                method: "PUT",
                body: adminData,
            }),
            invalidatesTags: ["settings"],
        }),
    }),
});

export const {
    useLoginAccountMutation,
    useChangePasswordMutation,
    useGetAdminDataQuery,
    useGetSettingsQuery,
    useResetPasswordMutation,
    useUpdateAdminDataMutation,
} = authApi;
