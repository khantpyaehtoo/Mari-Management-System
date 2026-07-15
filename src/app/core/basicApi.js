import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import CookieJS from "js-cookie";

export const baseApi = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        // http:// 192.168.0.182:8080/api/
        baseUrl: "http://192.168.0.183:8080/api/",
        prepareHeaders: (headers) => {
            const token = CookieJS.get("lmsToken");
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
                headers.set("Content-Type", "application/json");
                console.log(token);
            }

            return headers;
        },
    }),
    tagTypes: [
        "auth",
        "admin",
        "dashboard",
        "stats",
        "services",
        "users",
        "booking-management",
        "staffs",
        "calendar",
    ],
    endpoints: () => ({}),
});
