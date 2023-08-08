import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated: null,
    isAdmin: null,
};

const commonSlice = createSlice({
    name: "common",
    initialState,
    reducers: {
        setIsAuthenticated: (state, { payload }) => {
            state.isAuthenticated = payload;
        },
        setIsAdmin: (state, { payload }) => {
            state.isAdmin = payload;
        },
    },
});

export const { setIsAuthenticated, setIsAdmin } = commonSlice.actions;
export default commonSlice.reducer;
