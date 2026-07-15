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
            invalidatesTags: ["categories", "packages"],
        }),

        updatePackage: builder.mutation({
            query: ({ id, body }) => ({
                url: `${packageEndPoint}/${id}`,
                method: "PUT",
                body,
            }),
            invalidatesTags: ["categories", "packages"],
        }),

        deletePackage: builder.mutation({
            query: ({ id }) => ({
                url: `${packageEndPoint}/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["categories", "packages"],
        }),
    }),
});

export const {
    useCreatePackageMutation,
    useUpdatePackageMutation,
    useDeletePackageMutation,
} = packageApi;
