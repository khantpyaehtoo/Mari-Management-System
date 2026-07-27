import { baseApi } from "../../app/core/baseApi";
const walkinEndpoint = "walkin";

export const walkinApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getWalkinData: builder.query({
            query: (params) => ({
                url: `admin/customers/${walkinEndpoint}`,
                method: "GET",
                params: params,
            }),
            providesTags: ["walkin"],
        }),

        getWalkinById: builder.query({
            query: (id) => ({
                url: `admin/customers/${walkinEndpoint}/${id}`,
                method: "GET",
            }),
            providesTags: ["walkin"],
        }),
    }),
});

export const { useGetWalkinDataQuery, useGetWalkinByIdQuery } = walkinApi;
