import { baseApi } from "../../app/core/basicApi";
const staffPerformanceEndpoint = "staff-performance";
const dashboardStatsEndpoint = "stats";
const todayBookingListEndpoint = "today-bookings";
const weeklyBarChartEndpoint = "chart";
const serviceTrendingPieChart = "service-trending";

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
                url: `admin/dashboard/${weeklyBarChartEndpoint}?period=weekly`,
                method: "GET",
            }),
            providesTags: ["chart"],
        }),

        getStaffPerform: builder.query({
            query: () => ({
                url: `admin/dashboard/${staffPerformanceEndpoint}`,
                method: "GET",
            }),
            providesTags: ["staff-performance"],
        }),

        getServicePieChart: builder.query({
            query: () => ({
                url: `admin/dashboard/${serviceTrendingPieChart}`,
                method: "GET",
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
