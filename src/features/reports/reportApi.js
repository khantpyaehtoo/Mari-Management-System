import { baseApi } from "../../app/core/baseApi";

const reportEndPoint = "report-chart";

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
    }),
});

export const { useGetReportChartDataQuery } = reportApi;
