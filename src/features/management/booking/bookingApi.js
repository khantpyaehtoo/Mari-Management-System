import { baseApi } from "../../../app/core/global/basicApi";
const bookingEndPoint = "booking";

export const bookingApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllBooking: builder.query({
            query: () => ({
                url: `${bookingEndPoint}`,
                method: "GET",
            }),
            providesTags: ["booking"],
        }),

        createBooking: builder.mutation({
            query: (body) => ({
                url: `${bookingEndPoint}`,
                method: "POST",
                body,
            }),
            invalidatesTags: ["booking"],
        }),

        updateBooking: builder.mutation({
            query: ({ getAllBooking }) => ({
                url: `${bookingEndPoint}`,
                method: "PUT",
                body: getAllBooking,
            }),
            invalidatesTags: ["booking"],
        }),

        deleteBooking: builder.mutation({
            query: ({ getAllBooking }) => ({
                url: `${bookingEndPoint}`,
                method: "DELETE",
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
