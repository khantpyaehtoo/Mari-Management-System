import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import CookieJS from "js-cookie";
const BASE_URL =
    import.meta.env.VITE_BASE_API ||
    import.meta.env.VITE_BASE_API_1 ||
    import.meta.env.VITE_BASE_API_2;

export const baseApi = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: `${BASE_URL}/api/`,
        prepareHeaders: (headers) => {
            const token = CookieJS.get("lmsToken");
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
                // headers.set("Content-Type", "application/json");
                // console.log(token);
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
        "categories",
        "packages",

        "users",
        "booking-management",
        "walkin",
        "staffs",

        "calendar",
        "daily-status",
        "selected-day-leaves",

        "notifications",
        "report-chart",
    ],
    endpoints: () => ({}),
});
