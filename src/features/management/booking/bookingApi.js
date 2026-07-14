import { baseApi } from "../../../app/core/basicApi";
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
                size = 10,
            } = {}) => {
                const params = new URLSearchParams();
                if (status) params.append("status", status);
                if (startDate) params.append("startDate", startDate);
                if (endDate) params.append("endDate", endDate);
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
            query: ({ id, reason, actionType }) => {
                // Prepare the payload dynamically based on actionType
                const bodyPayload =
                    actionType !== "confirm" ? { reason } : undefined;

                return {
                    url: `booking/${id}/${actionType}`,
                    method: "PUT",
                    body: bodyPayload,
                };
            },
            invalidatesTags: ["bookings"],
        }),
    }),
});

export const {
    useGetAllBookingQuery,
    useBookingDetailsQuery,
    useUpdateBookingMutation,
} = bookingApi;
