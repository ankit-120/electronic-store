import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: []
}

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        fetchProduct: (state, action) => {
            state.products = action.payload;
        }
    }
})

export const { fetchProduct } = productSlice.actions;
export default productSlice.reducer;