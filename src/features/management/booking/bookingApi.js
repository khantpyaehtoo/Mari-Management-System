import { baseApi } from "../../../app/core/global/basicApi";
const bookingEndPoint = "/booking";

export const bookingApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllBooking: builder.query({
            query: (token) => ({
                url: `${bookingEndPoint}`,
                method: "GET",
                header: { Authorization: `Bearer ${token}` },
            }),
            providesTags: ["booking"],
        }),

        createBooking: builder.mutation({
            query: ({ getAllBooking, token }) => ({
                url: `${bookingEndPoint}`,
                method: "POST",
                header: { Authorization: `Bearer ${token}` },
                body: getAllBooking,
            }),
            invalidatesTags: ["booking"],
        }),

        updateBooking: builder.mutation({
            query: ({ getAllBooking, token }) => ({
                url: `${bookingEndPoint}`,
                method: "PUT",
                header: { Authorization: `Bearer ${token}` },
                body: getAllBooking,
            }),
            invalidatesTags: ["booking"],
        }),

        deleteBooking: builder.mutation({
            query: ({ getAllBooking, token }) => ({
                url: `${bookingEndPoint}`,
                method: "DELETE",
                header: { Authorization: `Bearer ${token}` },
                body: getAllBooking,
            }),
            invalidatesTags: ["booking"],
        }),
    }),
});

export const {
    useCreateBookingMutation,
    useGetAllBookingQuery,
    useUpdateBookingMutation,
    useDeleteBookingMutation,
} = bookingApi;
