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
            query: (username) => ({
                url: `${authEndPoint}/reset`,
                method: "PUT",
                body: { username },
            }),
            invalidatesTags: ["auth"],
        }),

        changePassword: builder.mutation({
            query: ({ updatePasswords, token }) => ({
                url: `${authEndPoint}/change-password`,
                method: "PUT",
                header: { Authorization: `Bearer ${token}` },
                body: updatePasswords,
            }),
            invalidatesTags: ["auth"],
        }),

        getAllSettings: builder.mutation({
            query: (token) => ({
                url: `${settingEndPoint}`,
                method: "GET",
                header: { Authorization: `Bearer ${token}` },
            }),
            providesTags: ["settings"],
        }),
    }),
});

export const {
    useLoginAccountMutation,
    useChangePasswordMutation,
    useGetAdminDataQuery,
    useGetAllSettingsMutation,
    useResetPasswordMutation,
} = authApi;
