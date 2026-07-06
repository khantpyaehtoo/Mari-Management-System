import { baseApi } from "../../../app/core/basicApi";
const serviceEndpoint = "services";
const categoryEndpoint = "category";

export const servicesApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getServicesData: builder.query({
            query: () => ({
                url: `${serviceEndpoint}`,
                method: "GET",
            }),
            providesTags: ["services"],
        }),

        getCategoryData: builder.query({
            query: () => ({
                url: `${categoryEndpoint}`,
                method: "GET",
            }),
            providesTags: ["category"],
        }),

        createCategory: builder.mutation({
            query: ({ body }) => ({
                url: `${categoryEndpoint}`,
                method: "POST",
                body,
            }),
            providesTags: ["category"],
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
            query: ({ id, body, token }) => ({
                url: `${serviceEndpoint}/${id}`,
                method: "PUT",
                body,
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

    useGetCategoryDataQuery,
    useCreateCategoryMutation,

    useGetPackageDataQuery,
    useCreatePackageMutation,
    useUpdatePackageMutation,
} = servicesApi;
