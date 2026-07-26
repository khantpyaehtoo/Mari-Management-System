import { baseApi } from "../../../app/core/baseApi";

const NOTIFICATIONS = "notifications";

export const incomeNotiApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getIncomingCustomerNotis: builder.query({
            query: (params = {}) => {
                const { tab } = params;
                const queryParams = tab && tab !== "all" ? { tab } : {};

                return {
                    url: `${NOTIFICATIONS}/admin/inbox/customer`,
                    method: "GET",
                    params: queryParams,
                };
            },
            providesTags: ["notifications", "customer"],
        }),

        getIncomingStaffNotis: builder.query({
            query: (params = {}) => {
                const { tab } = params;
                const queryParams = tab && tab !== "all" ? { tab } : {};

                return {
                    url: `${NOTIFICATIONS}/admin/inbox/staff`,
                    method: "GET",
                    params: queryParams,
                };
            },
            providesTags: ["notifications", "staff"],
        }),
    }),
});

export const {
    useGetIncomingCustomerNotisQuery,
    useGetIncomingStaffNotisQuery,
} = incomeNotiApi;
