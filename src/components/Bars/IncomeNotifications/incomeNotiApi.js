import { baseApi } from "../../../app/core/baseApi";
const notifications = "notifications";

export const incomeNotiApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getIncomingCustomerNotis: builder.query({
            query: () => ({
                url: `${notifications}/admin/customer`,
                method: "GET",
            }),
            providesTags: ["notifications", "customer"],
        }),

        getIncomingStaffNotis: builder.query({
            query: () => ({
                url: `${notifications}/admin/staff`,
                method: "GET",
            }),
            providesTags: ["notifications", "staff"],
        }),
    }),
});

export const {
    useGetIncomingCustomerNotisQuery,
    useGetIncomingStaffNotisQuery,
} = incomeNotiApi;
