import { baseApi } from "../../../app/core/global/basicApi";
const serviceEndpoint = "/services";

export const servicesApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getServicesData: builder.query({
            query: (token) => ({
                url: `${serviceEndpoint}`,
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            }),
            providesTags: ["services"],
        }),

        createService: builder.mutation({
            query: ({ getServicesData, token }) => ({
                url: `${serviceEndpoint}`,
                method: "POST",
                body: getServicesData,
                header: { Authorization: `Bearer ${token}` },
            }),
            invalidatesTags: ["services"],
        }),

        updateService: builder.mutation({
            query: (getServicesData) => ({
                url: `${serviceEndpoint}`,
                method: "PUT",
                body: getServicesData,
            }),
            invalidatesTags: ["services"],
        }),

        deleteService: builder.mutation({
            query: ({ getServicesData, token }) => ({
                url: `${serviceEndpoint}`,
                method: "DELETE",
                header: { Authorization: `Bearer ${token}` },
                body: getServicesData,
            }),
            invalidatesTags: ["services"],
        }),
    }),
});

export const {
    useGetServicesDataQuery,
    useCreateServiceMutation,
    useDeleteServiceMutation,
    useUpdateServiceMutation,
} = servicesApi;
