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
    name: "noti",
    initialState,
    reducer: {
        setMessage: (state, { payload }) => {
            state.message = payload;
        },
        setAlert: (state, { payload }) => {
            state.alert = payload;
        },
    },
});

export const { setMessage, setAlert } = notiSlice.actions;
export default notiSlice.reducer;
