import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    categoryList: [],
    brandList: [],
    search: '',
    price: '',
}

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        addCategory: (state, { payload }) => {
            state.categoryList.push(payload);
        },
        removeCategory: (state, { payload }) => {
            state.categoryList = state.categoryList.filter((category) => category !== payload);
        },
        addBrand: (state, { payload }) => {
            state.brandList.push(payload);
        },
        removeBrand: (state, { payload }) => {
            state.brandList = state.brandList.filter((brand) => brand !== payload);
        },
        updateSearch: (state, { payload }) => {
            state.search = payload;
        },
        updatePrice: (state, { payload }) => {
            state.price = payload
        },
        clearFilter: (state, action) => {
            state.categoryList = [];
            state.price = '';
            state.search = '';
        }
    }
});

export const { addCategory, removeCategory, updateSearch, updatePrice, clearFilter, addBrand, removeBrand } = filterSlice.actions;
// export const { filterSmartphones, filterLaptops, filterSkincare, filterFragrances } = filterSlice.actions;
export default filterSlice.reducer;