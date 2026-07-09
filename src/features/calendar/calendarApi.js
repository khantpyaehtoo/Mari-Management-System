import { baseApi } from "../../app/core/basicApi";
const calendarEndPoint = "calendar";

export const calendarApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getCalendarData: builder.query({
            query: (params) => ({
                url: `${calendarEndPoint}`,
                method: "GET",
                params: params, // ?month=07&year=2026
            }),
            providesTags: ["calendar"],
        }),

        createCalendarData: builder.mutation({
            query: (body) => ({
                url: `${calendarEndPoint}`,
                method: "POST",
                body,
            }),
            invalidatesTags: ["calendar"],
        }),

        updateCalendarData: builder.mutation({
            query: ({ id, body, token }) => ({
                url: `${calendarEndPoint}/${id}`,
                method: "PUT",
                body,
                headers: { Authorization: `Bearer ${token}` },
            }),
            invalidatesTags: ["calendar"],
        }),

        deleteCalendarData: builder.mutation({
            query: ({ id, token }) => ({
                url: `${calendarEndPoint}/${id}`,
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            }),
            invalidatesTags: ["calendar"],
        }),
    }),
});

export const {
    useCreateCalendarDataMutation,
    useGetCalendarDataQuery,
    useUpdateCalendarDataMutation,
    useDeleteCalendarDataMutation,
} = calendarApi;
