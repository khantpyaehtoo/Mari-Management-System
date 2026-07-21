import { baseApi } from "../../app/core/baseApi";

const reportEndPoint = "report-chart";
const dailyEndPoint = "daily-overview";

const reportApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getReportChartData: builder.query({
            query: ({ period, month, year } = {}) => ({
                url: `admin/dashboard/${reportEndPoint}`,
                method: "GET",
                params: {
                    ...(period && { period }),
                    ...(month && { month }),
                    ...(year && { year }),
                },
            }),
            providesTags: ["report-chart"],
        }),

        getReportBookingOverView: builder.query({
            query: ({ period, month, year }) => ({
                url: `admin/dashboard/${dailyEndPoint}`,
                method: "GET",
                params: {
                    ...(period && { period }),
                    ...(month && { month }),
                    ...(year && { year }),
                },
            }),
        }),
    }),
});

export const { useGetReportChartDataQuery, useGetReportBookingOverViewQuery } =
    reportApi;
