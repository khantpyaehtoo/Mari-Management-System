import { baseApi } from "../../../app/core/basicApi";
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

        updateBooking: builder.mutation({
            query: ({ bookingId }) => ({
                url: `${bookingEndPoint}/${bookingId}`,
                method: "POST",
            }),
            invalidatesTags: ["booking"],
        }),

        cancelBooking: builder.mutation({
            query: ({ id, reason, actionType }) => ({
                url: `${bookingEndPoint}/${id}/${actionType}`,
                method: "POST",
                body: { reason },
            }),
            invalidatesTags: ["booking"],
        }),
    }),
});

export const {
    useGetAllBookingQuery,
    useUpdateBookingMutation,
    useCancelBookingMutation,
} = bookingApi;
