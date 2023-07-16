import { configureStore } from '@reduxjs/toolkit'
import productReducer from '../facilities/productSlice'
import filterReducer from '../facilities/filterSlice'

export const store = configureStore({
    reducer: {
        products: productReducer,
        filters: filterReducer
    },
})