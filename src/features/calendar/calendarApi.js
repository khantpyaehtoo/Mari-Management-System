import { baseApi } from "../../app/core/baseApi";
const calendarData = "calendar";
const dailyStaff = "daily-status";
const dayLeave = "selected-day-leaves";
const assign = "assign";

export const calendarApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getCalendarData: builder.query({
            query: (params) => ({
                url: `admin/staffs/${calendarData}`,
                method: "GET",
                params: params,
            }),
            providesTags: ["calendar"],
        }),

        getDailyStaff: builder.query({
            query: () => ({
                url: `admin/staffs/${dailyStaff}`,
                method: "GET",
            }),
            providesTags: ["daily-status"],
        }),

        getSelectedDayLeaves: builder.query({
            query: (targetDate) => ({
                url: `admin/staffs/${dayLeave}`,
                method: "GET",
                params: { targetDate },
            }),
            providesTags: ["selected-day-leaves"],
        }),

        createCalendarData: builder.mutation({
            query: (body) => ({
                url: `admin/staffs/${assign}`,
                method: "POST",
                body,
            }),
            invalidatesTags: [
                "calendar",
                "daily-status",
                "selected-day-leaves",
            ],
        }),
    }),
});

export const {
    useGetDailyStaffQuery,
    useGetCalendarDataQuery,
    useGetSelectedDayLeavesQuery,
    useCreateCalendarDataMutation,
    useUpdateCalendarDataMutation,
    useDeleteCalendarDataMutation,
} = calendarApi;
