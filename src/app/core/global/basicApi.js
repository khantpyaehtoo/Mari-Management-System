import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import CookieJS from "js-cookie";

export const baseApi = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://192.168.0.182:8080/api/",
        // http:// 192.168.0.182:8080/api/
        // credentials: "include",
        prepareHeaders: (headers) => {
            // const token = CookieJS.get("lmsToken");
            // console.log("JWT: ", token);
            // if (token) {
            //     headers.set("Authorization", `Bearer ${token}`);
            //     console.log(token);
            // }
            headers.set("Content-Type", "application/json");
            headers.set("Access-Control-Allow-Origin", "*");

            return headers;
        },
    }),
    tagTypes: ["auth", "settings", "services", "users", "booking", "staffs"],
    endpoints: () => ({}),
});
