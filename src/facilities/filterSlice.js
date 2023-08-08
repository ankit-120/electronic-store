import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    categoryList: [],
    brandList: [],
    filterList: {
        category: "",
        brand: "",
    },
    priceFilter: {
        min: "",
        max: "",
    },
};

const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        addCategory: (state, { payload }) => {
            state.categoryList = payload;
        },
        setCategoryFilter: (state, { payload }) => {
            state.filterList.category = payload;
        },
        addBrand: (state, { payload }) => {
            state.brandList = payload;
        },
        setBrandFilter: (state, { payload }) => {
            state.filterList.brand = payload;
        },
        setPriceFilter: (state, { payload }) => {
            state.priceFilter.min = payload.min;
            state.priceFilter.max = payload.max;
        },
        clearFilter: (state, { payload }) => {
            state.filterList = {
                category: "",
                brand: "",
            };
            state.priceFilter = {
                min: "",
                max: "",
            };
        },
    },
});

export const {
    addCategory,
    setCategoryFilter,
    addBrand,
    setBrandFilter,
    setPriceFilter,
    clearFilter,
} = filterSlice.actions;
export default filterSlice.reducer;
