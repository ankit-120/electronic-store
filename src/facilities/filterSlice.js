import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    smartphones: false,
    laptops: false,
    fragrances: false,
    skincare: false
}

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        filterSmartphones: (state, action) => {
            state.smartphones = !state.smartphones
        },
        filterLaptops: (state, action) => {
            state.laptops = !state.laptops
        },
        filterFragrances: (state, action) => {
            state.fragrances = !state.fragrances
        },
        filterSkincare: (state, action) => {
            state.skincare = !state.skincare
        }
    }
});

export const { filterSmartphones, filterLaptops, filterSkincare, filterFragrances } = filterSlice.actions;
export default filterSlice.reducer;