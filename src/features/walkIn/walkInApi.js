import { baseApi } from "../../app/core/basicApi";
const walkinEndpoint = "walkin";

export const walkinApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getWalkinData: builder.query({
            query: () => ({
                url: `admin/customers/${walkinEndpoint}`,
                method: "GET",
            }),
            providesTags: ["walkin"],
        }),

        getWalkinById: builder.query({
            query: (id) => ({
                url: `admin/customers/${walkinEndpoint}/${id}`,
            }),
            invalidatesTags: ["walkin"],
        }),
    }),
});

export const { useGetWalkinDataQuery, useGetWalkinByIdQuery } = walkinApi;
