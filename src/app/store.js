import { configureStore } from "@reduxjs/toolkit";
import layoutReducer from "../layout/LayoutSlice";
import { baseApi } from "./core/global/basicApi";
import authReducer from "../features/auth/authSlice";
import notiReducer from "./core/notiSlice";

export const store = configureStore({
    reducer: {
        [baseApi.reducerPath]: baseApi.reducer,
        layout: layoutReducer,
        auth: authReducer,
        noti: notiReducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(baseApi.middleware),
});

