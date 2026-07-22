import { baseApi } from "../../../app/core/baseApi";
const bookingEndPoint = "booking-management";

export const bookingApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllBooking: builder.query({
            query: ({
                status,
                startDate,
                endDate,
                page = 0,
                size,
                search,
            } = {}) => ({
                url: `admin/${bookingEndPoint}/overview`,
                method: "GET",
                params: {
                    page,
                    size,
                    ...(status && { status }),
                    ...(startDate && { startDate }),
                    ...(endDate && { endDate }),
                    ...(search && { search }),
                },
            }),
            providesTags: ["booking-management"],
        }),

        bookingDetails: builder.query({
            query: (bookingId) => ({
                url: `admin/${bookingEndPoint}/${bookingId}/details`,
                method: "GET",
            }),
            providesTags: ["booking-management"],
        }),

        updateBooking: builder.mutation({
            query: ({ id, reason, actionType }) => {
                const bodyPayload =
                    actionType !== "confirm" ? { reason } : undefined;

                return {
                    url: `bookings/${id}/${actionType}`,
                    method: "PUT",
                    body: bodyPayload,
                };
            },
            invalidatesTags: ["booking-management", "bookings"],
        }),
    }),
});

export const {
    useGetAllBookingQuery,
    useBookingDetailsQuery,
    useUpdateBookingMutation,
} = bookingApi;
