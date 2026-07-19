import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import CookieJS from "js-cookie";
const BASE_URL = import.meta.env.VITE_BASE_API;

export const baseApi = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: `${BASE_URL}/api/`,
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
        "notifications",
    ],
    endpoints: () => ({}),
});
