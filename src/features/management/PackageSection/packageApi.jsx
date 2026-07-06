import { baseApi } from "../../../app/core/basicApi";

const packageEndPoint = "package";

export const packageApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getPackageData: builder.query({
            query: (body) => ({
                url: `${packageEndPoint}`,
                method: "GET",
                body,
            }),
            invalidatesTags: ["package"],
        }),

        createPackage: builder.mutation({
            query: (body) => ({
                url: `${packageEndPoint}`,
                method: "POST",
                body,
            }),
            invalidatesTags: ["package"],
        }),

        updatePackage: builder.mutation({
            query: ({ id, body, token }) => ({
                url: `${packageEndPoint}/${id}`,
                method: "PUT",
                body,
                headers: { Authorization: `Bearer ${token}` },
            }),
            invalidatesTags: ["package"],
        }),

        deleteService: builder.mutation({
            query: ({ id, token }) => ({
                url: `${packageEndPoint}/${id}`,
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            }),
            invalidatesTags: ["package"],
        }),
    }),
});

export const {
    useGetPackageDataQuery,
    useCreatePackageMutation,
    useUpdatePackageMutation,
} = packageApi;
