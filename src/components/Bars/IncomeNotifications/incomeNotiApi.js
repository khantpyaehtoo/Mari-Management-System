import { baseApi } from "../../../app/core/baseApi";

export const incomeNotiApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getIncomingCustomerNotis: builder.query({
            query: () => ({
                url: `notifications/customer`,
                method: "GET",
            }),
            providesTags: ["incoming-notifications"],
        }),

        getIncomingStaffNotis: builder.query({
            query: () => ({
                url: `notifications/staff`,
                method: "GET",
            }),
            providesTags: ["incoming-notifications"],
        }),
    }),
});

export const {
    useGetIncomingCustomerNotisQuery,
    useGetIncomingStaffNotisQuery,
} = incomeNotiApi;
