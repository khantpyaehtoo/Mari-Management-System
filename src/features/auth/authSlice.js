import { createSlice } from "@reduxjs/toolkit";
import Cookie from "js-cookie";

const token = Cookie.get("lmsToken") ? Cookie.get("lmsToken") : null;
const username = Cookie.get("username") ? Cookie.get("username") : null;

const initialState = {
    isLoggedIn: !!token,
    username,
    token,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setLoggedIn: (state, { payload }) => {
            state.username = payload.username;
            state.token = payload.token;
        },

        removeCookie: () => {
            Cookie.remove("username");
            Cookie.remove("lmsToken");
        },
    },
});

export const { setLoggedIn } = authSlice.actions;
export default authSlice.reducer;
