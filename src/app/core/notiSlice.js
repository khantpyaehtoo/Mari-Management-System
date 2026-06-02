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
    reducers: {
        setMessage: (state, { payload }) => {
            state.message = payload.message;
        },
        setAlert: (state, { payload }) => {
            state.alert = payload;
        },
    },
});

export const { setMessage, setAlert } = notiSlice.actions;
export default notiSlice.reducer;
