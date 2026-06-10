import { baseApi } from "../../app/core/global/basicApi";
const authEndPoint = "/auth";
const settingEndPoint = "/settings";

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

        updateAdminData: builder.mutation({
            query: ({ adminData, token }) => ({
                url: `${authEndPoint}/update`,
                method: "PUT",
                headers: { Authorization: `Bearer ${token}` },
                body: adminData,
            }),
            invalidatesTags: ["auth"],
        }),

        getAllSettings: builder.query({
            query: (token) => ({
                url: `${settingEndPoint}`,
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            }),
            providesTags: ["settings"],
        }),
    }),
});

export const {
    useLoginAccountMutation,
    useChangePasswordMutation,
    useGetAdminDataQuery,
    useGetAllSettingsQuery,
    useResetPasswordMutation,
    useUpdateAdminDataMutation,
} = authApi;
