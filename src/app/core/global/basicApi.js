import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import CookieJS from "js-cookie";

export const baseApi = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        // http:// 192.168.0.182:8080/api/
        baseUrl: "http://192.168.0.182:8080/api/",
        credentials: "same-origin",
        prepareHeaders: (headers) => {
            const token = CookieJS.get("lmsToken");
            // console.log("JWT: ", token);
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
                headers.set("Content-Type", "application/json");

                console.log(token);
            }
            // headers.set("Access-Control-Allow-Origin", "*");
            // headers.set("Cross-Origin-Resource-Policy", "cross-origin");

            return headers;
        },
    }),
    tagTypes: ["auth", "settings", "services", "users", "booking", "staffs"],
    endpoints: () => ({}),
});

// const baseQuery = fetchBaseQuery({
//     baseUrl: "http://192.168.0.182:8080/api/",
//     credentials: "same-origin",
//     prepareHeaders: (headers) => {
//         const accessToken = CookieJS.get("lmsToken");
//         if (accessToken) {
//             headers.set("authorization", `Bearer ${accessToken}`);
//             headers.set("Content-Type", "application/json");
//         }
//         return headers;
//     },
// });

// export const baseQueryWithReauth = async({BaseQueryFn, FetchArgs, FetchBaseQueryError}) => {
//     return await baseQuery()
// }
