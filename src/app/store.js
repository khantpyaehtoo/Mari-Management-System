import { configureStore } from "@reduxjs/toolkit";
import layoutReducer from "../layout/LayoutSlice";
import { baseApi } from "./core/global/basicApi";
import { authSlice } from "../features/auth/authSlice";
import { notiSlice } from "./core/notiSlice";

export const store = configureStore({
    reducer: {
        [baseApi.reducerPath]: baseApi.reducer,
        layout: layoutReducer,
        auth: authSlice,
        noti: notiSlice,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(baseApi.middleware),
});
