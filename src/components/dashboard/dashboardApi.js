import { baseApi } from "../../app/core/basicApi";
const staffPerformanceEndpoint = "staff-performance";
const dashboardStatsEndpoint = "stats";
const todayBookingListEndpoint = "today-bookings";
const weeklyBarChartEndpoint = "chart";

export const dashboardApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getDashBoardCardStats: builder.query({
            query: () => ({
                url: `admin/dashboard/${dashboardStatsEndpoint}`,
                method: "GET",
            }),
            providesTags: ["stats"],
        }),

        getWeeklyChartData: builder.query({
            query: () => ({
                url: `/api/admin/dashboard/${weeklyBarChartEndpoint}?period=weekly`,
                method: "GET",
            }),
            providesTags: ["chart"],
        }),

        getStaffPerform: builder.query({
            query: () => ({
                url: `admin/dashboard/${staffPerformanceEndpoint}`,
                method: "GET",
            }),
            providesTags: ["admin", "dashboard"],
        }),

        getTodayBookingList: builder.query({
            query: () => ({
                url: `admin/dashboard/${todayBookingListEndpoint}`,
                method: "GET",
            }),
            providesTags: ["admin/dashboard"],
        }),
    }),
});

export const {
    useGetStaffPerformQuery,
    useGetDashBoardCardStatsQuery,
    useGetTodayBookingListQuery,
} = dashboardApi;
