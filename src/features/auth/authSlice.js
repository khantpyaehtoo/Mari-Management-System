import { createSlice } from "@reduxjs/toolkit";
import Cookie from "js-cookie";

const token = Cookie.get("lmsToken") ? Cookie.get("lmsToken") : null;
const email = Cookie.get("email") ? Cookie.get("email") : null;

const initialState = {
    isLoggedIn: !!token,
    email,
    token,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setLoggedIn: (state, { payload }) => {
            state.email = payload.email;
            state.token = payload.token;
        },

        removeCookie: () => {
            Cookie.remove("email");
            Cookie.remove("lmsToken");
        },
    },
});

export const { setLoggedIn, removeCookie } = authSlice.actions;
export default authSlice.reducer;
