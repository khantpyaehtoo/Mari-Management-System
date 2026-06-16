import { configureStore } from "@reduxjs/toolkit";
import layoutSlice from "../layout/layoutSlice";
import { baseApi } from "./core/basicApi";
import authSlice from "../features/auth/authSlice";
import notiSlice from "./core/notiSlice";

export const store = configureStore({
    reducer: {
        [baseApi.reducerPath]: baseApi.reducer,
        layout: layoutSlice,
        auth: authSlice,
        noti: notiSlice,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(baseApi.middleware),
});
