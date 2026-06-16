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
            query: ({ id, token }) => ({
                url: `${serviceEndpoint}/${id}`,
                method: "PUT",
                headers: { Authorization: `Bearer ${token}` },
            }),
            invalidatesTags: ["services"],
        }),

        deleteService: builder.mutation({
            query: ({ id, token }) => ({
                url: `${serviceEndpoint}/${id}`,
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
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
