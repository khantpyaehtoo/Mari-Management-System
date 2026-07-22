import { baseApi } from "../../../app/core/baseApi";

const packageEndPoint = "packages";

export const packageApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createPackage: builder.mutation({
            query: (body) => ({
                url: `${packageEndPoint}`,
                method: "POST",
                body,
            }),
            invalidatesTags: ["categories", "packages", "services"],
        }),

        updatePackage: builder.mutation({
            query: ({ id, body }) => ({
                url: `${packageEndPoint}/${id}`,
                method: "PUT",
                body,
            }),
            invalidatesTags: ["categories", "packages", "services"],
        }),

        restorePackage: builder.mutation({
            query: (id) => ({
                url: `${packageEndPoint}/${id}/restore`,
                method: "PUT",
                body: {},
            }),
            invalidatesTags: ["categories", "packages", "services"],
        }),

        deletePackage: builder.mutation({
            query: (id) => ({
                url: `${packageEndPoint}/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["categories", "packages", "services"],
        }),
    }),
});

export const {
    useCreatePackageMutation,
    useUpdatePackageMutation,
    useRestorePackageMutation,
    useDeletePackageMutation,
} = packageApi;
