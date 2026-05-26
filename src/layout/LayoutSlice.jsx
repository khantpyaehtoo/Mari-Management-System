import { createSlice } from "@reduxjs/toolkit";

export const layoutSlice = createSlice({
    name: "layout",
    initialState: {
        isSidebarOpen: false,
    },
    reducers: {
        toggleSidebar: (state, { payload }) => {
            state.isSidebarOpen = payload;
        },
    },
});

export const { toggleSidebar } = layoutSlice.actions;
export default layoutSlice.reducer;
