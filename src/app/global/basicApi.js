import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

export const baseApi = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "",
        credentials: "include", // => for cookie
    }),
    tagTypes: [],
    endpoints: () => ({}),
});
