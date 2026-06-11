import { baseApi } from "../../../app/core/basicApi";
const serviceEndpoint = "services";

export const servicesApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getServicesData: builder.query({
            query: () => ({
                url: `${serviceEndpoint}`,
                method: "GET",
            }),
            providesTags: ["services"],
        }),

        createService: builder.mutation({
            query: (body) => ({
                url: `${serviceEndpoint}`,
                method: "POST",
                body,
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
            query: ({ getServicesData }) => ({
                url: `${serviceEndpoint}`,
                method: "DELETE",
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
