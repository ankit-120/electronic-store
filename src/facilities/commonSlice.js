import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated: false,
    isLoggedin: false,
}

const commonSlice = createSlice({
    name: "common",
    initialState,
    reducers: {
        setIsAuthenticated: (state, action) => {
            state.isAuthenticated = !state.isAuthenticated;
        },
        setIsLoggedIn: (state, action) => {
            state.isLoggedin = !state.isLoggedin;
        }
    }
})

export const { setIsAuthenticated, setIsLoggedIn } = commonSlice.actions;
export default commonSlice.reducer;