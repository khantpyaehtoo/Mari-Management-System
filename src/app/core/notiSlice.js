import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    message: {
        msgType: null,
        msgContent: null,
    },
    alert: {
        alertType: null,
        alertContent: null,
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
            };
        },
        setAlert: (state, { payload }) => {
            state.alert = payload;
        },
    },
});

export const { setMessage, setAlert, clearMessage } = notiSlice.actions;
export default notiSlice.reducer;
