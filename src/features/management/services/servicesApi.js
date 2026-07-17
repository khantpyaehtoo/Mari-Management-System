import { baseApi } from "../../../app/core/baseApi";
const serviceEndpoint = "services";
const categoryEndpoint = "categories";

export const servicesApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getCategorybyId: builder.query({
            query: (id) => ({
                url: `${serviceEndpoint}/${id}`,
                method: "GET",
            }),
            providesTags: ["categories"],
        }),

        getCategoryData: builder.query({
            query: () => ({
                url: `${categoryEndpoint}`,
                method: "GET",
            }),
            providesTags: ["categories"],
        }),

        createCategory: builder.mutation({
            query: (body) => ({
                url: `${categoryEndpoint}`,
                method: "POST",
                body,
            }),
            invalidatesTags: ["categories"],
        }),

        getAllServiceData: builder.query({
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
    useGetAllServiceDataQuery,
    useCreateServiceMutation,
    useDeleteServiceMutation,
    useUpdateServiceMutation,

    useGetCategoryDataQuery,
    useCreateCategoryMutation,
} = servicesApi;
