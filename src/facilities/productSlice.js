import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [],
    limit: 0,
    productCount: 0,
    search: "",
};

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        fetchProduct: (state, action) => {
            state.products = action.payload.products;
            state.limit = action.payload.limit;
            state.productCount = action.payload.productCount;
        },
        setSearch: (state, { payload }) => {
            state.search = payload;
        },
    },
});

export const { fetchProduct, setSearch } = productSlice.actions;
export default productSlice.reducer;
