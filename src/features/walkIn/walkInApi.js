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
    }),
});

export const { useGetWalkinDataQuery } = walkinApi;
