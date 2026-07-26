import { baseApi } from "../../../app/core/baseApi";

const NOTIFICATIONS = "notifications";

export const incomeNotiApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getIncomingCustomerNotis: builder.query({
            query: (params = {}) => {
                const { tab = "all" } = params;
                const queryParams = tab && tab !== "all" ? { tab } : {};

                return {
                    url: `${NOTIFICATIONS}/admin/inbox/customer`,
                    method: "GET",
                    params: queryParams,
                };
            },
            providesTags: (result) =>
                result
                    ? [
                          ...result.content.map(({ id }) => ({
                              type: "notifications",
                              id,
                          })),
                          { type: "notifications", id: "CUSTOMER_LIST" },
                      ]
                    : [{ type: "notifications", id: "CUSTOMER_LIST" }],
        }),

        getIncomingStaffNotis: builder.query({
            query: (params = {}) => {
                const { tab = "all" } = params;
                const queryParams = tab && tab !== "all" ? { tab } : {};

                return {
                    url: `${NOTIFICATIONS}/admin/inbox/staff`,
                    method: "GET",
                    params: queryParams,
                };
            },
            providesTags: (result) =>
                result
                    ? [
                          ...result.content.map(({ id }) => ({
                              type: "notifications",
                              id,
                          })),
                          { type: "notifications", id: "STAFF_LIST" },
                      ]
                    : [{ type: "notifications", id: "STAFF_LIST" }],
        }),
    }),
});

export const {
    useGetIncomingCustomerNotisQuery,
    useGetIncomingStaffNotisQuery,
} = incomeNotiApi;
