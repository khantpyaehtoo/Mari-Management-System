import { createSlice } from "@reduxjs/toolkit";

export const layoutSlice = createSlice({
    name: "layout",
    initialState: {
        isOpen: false,
    },
    reducers: {
        toggleSidebar: (state, { payload }) => {
            state.isOpen = payload;
        },
    },
});

export const { toggleSidebar } = layoutSlice.actions;
export default layoutSlice.reducer;
