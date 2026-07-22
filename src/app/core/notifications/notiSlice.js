import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    message: {
        msgType: null,
        msgContent: null,
        title: null,
        duration: 4,
    },
    alert: {
        alertType: null,
        alertContent: null,
    },
    placement: {
        placeholderType: "top",
    },
};

export const notiSlice = createSlice({
    name: "notiSlice",
    initialState,
    reducers: {
        setMessage: (state, { payload }) => {
            state.message = payload;
        },
        clearMessage: (state) => {
            state.message = {
                msgType: null,
                msgContent: null,
                title: null,
                duration: 4,
            };
        },
        setAlert: (state, { payload }) => {
            state.alert = payload;
        },
        // Easily update placement dynamically
        setPlacement: (state, { payload }) => {
            state.placement.placeholderType = payload;
        },
    },
});

export const { setMessage, setAlert, clearMessage, setPlacement } =
    notiSlice.actions;
export default notiSlice.reducer;
