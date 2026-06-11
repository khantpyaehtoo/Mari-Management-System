import { configureStore } from "@reduxjs/toolkit";
import layoutReducer from "../layout/layoutSlice";
import { baseApi } from "./core/basicApi";
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
