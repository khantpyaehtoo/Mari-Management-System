import { baseApi } from "../../app/core/baseApi";
const notifications = "";

export const notiApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllNotiHistory: builder.query({
            query: () => ({
                url: ``,
                method: "GET",
            }),
            providesTags: [""],
        }),
    }),
});
