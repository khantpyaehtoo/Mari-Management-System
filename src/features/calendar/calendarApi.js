import dayjs from "dayjs";
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
            query: (targetDate) => {
                const formattedDate = targetDate
                    ? dayjs.isDayjs(targetDate)
                        ? targetDate.format("YYYY-MM-DD")
                        : targetDate
                    : dayjs().format("YYYY-MM-DD");

                return {
                    url: `admin/staffs/${dailyStaff}`,
                    method: "GET",
                    params: { targetDate: formattedDate },
                };
            },
            providesTags: ["daily-status"],
        }),

        getSelectedDayLeaves: builder.query({
            query: (targetDate) => {
                // Instant Format (ISO String)
                const formattedDate = targetDate
                    ? dayjs.isDayjs(targetDate)
                        ? targetDate.startOf("day").toISOString()
                        : new Date(targetDate).toISOString()
                    : dayjs().startOf("day").toISOString();

                return {
                    url: `admin/staffs/${dayLeave}`,
                    method: "GET",
                    params: { targetDate: formattedDate },
                };
            },
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
