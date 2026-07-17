import { baseApi } from "../../app/core/baseApi";
const staffPerformanceEndpoint = "staff-performance";
const dashboardStatsEndpoint = "stats";
const todayBookingListEndpoint = "today-bookings";
const weeklyBarChartEndpoint = "chart";
const serviceTrendingPieChart = "service-trending";

export const dashboardApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getDashBoardCardStats: builder.query({
            query: ({ period, month, year } = {}) => ({
                url: `admin/dashboard/${dashboardStatsEndpoint}`,
                method: "GET",
                params: {
                    ...(period && { period }),
                    ...(month && { month }),
                    ...(year && { year }),
                },
            }),
            providesTags: ["stats"],
        }),

        getWeeklyChartData: builder.query({
            query: () => ({
                url: `admin/dashboard/${weeklyBarChartEndpoint}?period=weekly`,
                method: "GET",
            }),
            providesTags: ["chart"],
        }),

        // period month year is for reports page
        getStaffPerform: builder.query({
            query: ({ period, month, year } = {}) => ({
                url: `admin/dashboard/${staffPerformanceEndpoint}`,
                method: "GET",
                params: {
                    ...(period && { period }),
                    ...(month && { month }),
                    ...(year && { year }),
                },
            }),
            providesTags: ["staff-performance"],
        }),

        getServicePieChart: builder.query({
            query: ({ period, month, year } = {}) => ({
                url: `admin/dashboard/${serviceTrendingPieChart}`,
                method: "GET",
                params: {
                    ...(period && { period }),
                    ...(month && { month }),
                    ...(year && { year }),
                },
            }),
            providesTags: ["service-trending"],
        }),

        getTodayBookingList: builder.query({
            query: () => ({
                url: `admin/dashboard/${todayBookingListEndpoint}`,
                method: "GET",
            }),
            providesTags: ["today-bookings"],
        }),
    }),
});

export const {
    useGetStaffPerformQuery,
    useGetDashBoardCardStatsQuery,
    useGetTodayBookingListQuery,
    useGetServicePieChartQuery,
    useGetWeeklyChartDataQuery,
} = dashboardApi;
