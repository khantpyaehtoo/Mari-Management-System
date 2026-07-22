import { baseApi } from "../../app/core/baseApi";
const notifications = "notifications";

export const notiApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getStaffNotifications: builder.query({
            query: () => ({
                url: `${notifications}/admin/staff`,
                method: "GET",
            }),
            providesTags: ["notifications", "staff"],
        }),

        getCustomerNotifications: builder.query({
            query: () => ({
                url: `${notifications}/admin/customer`,
                method: "GET",
            }),
            providesTags: ["notifications", "customer"],
        }),

        createNotification: builder.mutation({
            query: (formData) => ({
                url: `${notifications}`,
                method: "POST",
                body: formData,
            }),
            invalidatesTags: ["notifications", "customer", "staff"],
        }),

        deleteNotiHistory: builder.mutation({
            query: (id) => ({
                url: `${notifications}/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["notifications"],
        }),
    }),
});

export const {
    useGetStaffNotificationsQuery,
    useGetCustomerNotificationsQuery,
    useCreateNotificationMutation,
    useDeleteNotiHistoryMutation,
} = notiApi;
