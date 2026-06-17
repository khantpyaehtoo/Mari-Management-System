import { baseApi } from "../../app/core/basicApi";
const calendarEndPoint = "calendar";

export const calendarApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getCalendarData: builder.query({
            query: () => ({
                url: `${calendarEndPoint}`,
                method: "GET",
            }),
            providesTags: ["calendar"],
        }),
        createCalendarData: builder.mutation({
            query: (body, token) => ({
                url: `${calendarEndPoint}`,
                method: "POST",
                body,
                headers: { Authorization: `Bearer ${token}` },
            }),
            invalidatesTags: ["calendar"],
        }),
        updateCalendarData: builder.mutation({
            query: (id, token) => ({
                url: `${calendarEndPoint}/${id}`,
                method: "PUT",
                headers: { Authorization: `Bearer ${token}` },
            }),
        }),
        deleteCalendarData: builder.mutation({
            query: (id, token) => ({
                url: `${calendarEndPoint}/${id}`,
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            }),
        }),
    }),
});

export const {
    useCreateCalendarDataMutation,
    useGetCalendarDataQuery,
    useUpdateCalendarDataMutation,
    useDeleteCalendarDataMutation,
} = calendarApi;
