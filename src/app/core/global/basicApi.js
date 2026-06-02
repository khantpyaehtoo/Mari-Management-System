import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://192.168.0.182:8080/api",
        // credentials: "include",
    }),
    tagTypes: ["auth", "settings", "services"],
    endpoints: () => ({}),
});
