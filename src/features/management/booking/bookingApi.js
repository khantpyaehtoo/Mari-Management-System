import { baseApi } from "../../../app/core/baseApi";
const bookingEndPoint = "booking-management";

export const bookingApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // Pass params as an object argument
        getAllBooking: builder.query({
            query: ({
                status,
                startDate,
                endDate,
                page = 0,
                size,
                search,
            } = {}) => {
                const params = new URLSearchParams();

                if (status) params.append("status", status);
                if (startDate) params.append("startDate", startDate);
                if (endDate) params.append("endDate", endDate);
                if (search) params.append("search", search);

                params.append("page", page.toString());
                params.append("size", size.toString());

                return {
                    url: `admin/${bookingEndPoint}/overview?${params.toString()}`,
                    method: "GET",
                };
            },
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
            query: ({ id, reason, actionType, token }) => {
                const bodyPayload =
                    actionType !== "confirm" ? { reason } : undefined;

                return {
                    url: `bookings/${id}/${actionType}`,
                    method: "PUT",
                    headers: { authorization: `Bearer ${token}` },
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
