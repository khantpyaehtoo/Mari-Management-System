import { configureStore } from "@reduxjs/toolkit";
import { layoutSlice } from "../layout/LayoutSlice";
import { baseApi } from "./global/basicApi";

export const store = configureStore({
    reducer: {
        [baseApi.reducerPath]: baseApi.reducer,
        layout: layoutSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(baseApi.middleware),
});
