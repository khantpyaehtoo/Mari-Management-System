import { configureStore } from "@reduxjs/toolkit";
import { layoutSlice } from "../layout/LayoutSlice";
import { baseApi } from "./core/global/basicApi";
import { authSlice } from "../features/auth/authSlice";

export const store = configureStore({
    reducer: {
        [baseApi.reducerPath]: baseApi.reducer,
        layout: layoutSlice,
        auth: authSlice,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(baseApi.middleware),
});
