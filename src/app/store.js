import { configureStore } from "@reduxjs/toolkit";
import layoutReducer from "../layout/LayoutSlice";
import { baseApi } from "./core/global/basicApi";
import { authSlice } from "../features/auth/authSlice";

export const store = configureStore({
    reducer: {
        [baseApi.reducerPath]: baseApi.reducer,
        layout: layoutReducer,
        auth: authSlice,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(baseApi.middleware),
});
