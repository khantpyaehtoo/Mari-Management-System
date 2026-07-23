import { baseApi } from "../../app/core/baseApi";
const authEndPoint = "auth";
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

        requestOtp: builder.mutation({
            query: (data) => ({
                url: `${authEndPoint}/forgot-password`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["auth"],
        }),

        verifyOtp: builder.mutation({
            query: (data) => ({
                url: `${authEndPoint}/verify-otp`,
                method: "POST",
                body: data,
            }),
        }),

        resetPassword: builder.mutation({
            query: ({ newPassword, token }) => ({
                url: `${authEndPoint}/reset-password`,
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: { newPassword },
            }),
            invalidatesTags: ["auth"],
        }),

        changePassword: builder.mutation({
            query: ({ updatePasswords, token }) => ({
                url: `users/${settingEndPoint}/change-password`,
                method: "PUT",
                headers: { Authorization: `Bearer ${token}` },
                body: updatePasswords,
            }),
            invalidatesTags: ["auth"],
        }),

        getSettings: builder.query({
            query: () => ({
                url: `users/${settingEndPoint}`,
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
    useGetAdminDataQuery,
    useGetSettingsQuery,
    useUpdateAdminDataMutation,

    useRequestOtpMutation,
    useVerifyOtpMutation,
    useResetPasswordMutation,
    useChangePasswordMutation,
} = authApi;
