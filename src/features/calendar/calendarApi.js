import { baseApi } from "../../app/core/basicApi";
const calendarEndPoint = "calendar";
const dailyStatus = "daily-status";

export const calendarApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getCalendarData: builder.query({
            query: (params) => ({
                url: `admin/staffs/${calendarEndPoint}`,
                method: "GET",
                params: params, // ?month=07&year=2026
            }),
            providesTags: ["calendar"],
        }),

        getDailyStaff: builder.query({
            query: () => ({
                url: `admin/staffs/${dailyStatus}`,
                method: "GET",
            }),
            providesTags: ["daily-status"],
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
    useGetDailyStaffQuery,
    useGetCalendarDataQuery,
    useCreateCalendarDataMutation,
    useUpdateCalendarDataMutation,
    useDeleteCalendarDataMutation,
} = calendarApi;
