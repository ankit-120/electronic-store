import { configureStore } from '@reduxjs/toolkit'
import productReducer from '../facilities/productSlice'
import filterReducer from '../facilities/filterSlice'
import imageReducer from '../facilities/imageSlice'
import cartReducer from '../facilities/cartSlice'
import commonReducer from '../facilities/commonSlice'

export const store = configureStore({
    reducer: {
        products: productReducer,
        filters: filterReducer,
        images: imageReducer,
        cart: cartReducer,
        common: commonReducer
    },
})