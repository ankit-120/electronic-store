import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart: JSON.parse(localStorage.getItem('cartItem') || '[]')
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, { payload }) => {
            state.cart.push(payload);
            localStorage.setItem('cartItem', JSON.stringify(state.cart));
        },
        removeFromCart: (state, { payload }) => {
            state.cart = state.cart.filter((item) => item.id !== payload);
            localStorage.setItem('cartItem', JSON.stringify(state.cart));
        }
    }
})

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;