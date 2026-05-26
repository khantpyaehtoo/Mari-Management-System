import { configureStore } from "@reduxjs/toolkit";
import { layoutSlice } from "../layout/LayoutSlice";

export const store = configureStore({
    reducer: {
        layout: layoutSlice,
    },
});
