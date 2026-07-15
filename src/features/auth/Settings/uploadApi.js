import { baseApi } from "../../../app/core/baseApi";

const uploadEndPoint = "upload";
const trendingEndPoint = "trending";
const vendor = "vendor";

export const uploadApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllVendorDesign: builder.query({
            query: () => ({
                url: `${vendor}`,
                method: "GET",
            }),
            providesTags: ["vendor"],
        }),

        vendorUpload: builder.mutation({
            query: (body) => ({
                url: `${vendor}`,
                method: "POST",
                body,
            }),
            invalidatesTags: ["vendor"],
        }),

        deleteHeroDesign: builder.mutation({
            query: (id) => ({
                url: `${vendor}/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["vendor"],
        }),

        getAllTrendingDesign: builder.query({
            query: () => ({
                url: `designs/${trendingEndPoint}`,
                method: "GET",
            }),
            providesTags: ["trending"],
        }),

        trendingUpload: builder.mutation({
            query: (body) => ({
                url: `designs/${uploadEndPoint}`,
                method: "POST",
                body,
            }),
            invalidatesTags: ["trending"],
        }),

        deleteTrendingDesign: builder.mutation({
            query: (id) => ({
                url: `designs/${trendingEndPoint}/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["trending"],
        }),
    }),
});

export const {
    useGetAllVendorDesignQuery,
    useVendorUploadMutation,
    useDeleteHeroDesignMutation,

    useGetAllTrendingDesignQuery,
    useTrendingUploadMutation,
    useDeleteTrendingDesignMutation,
} = uploadApi;
