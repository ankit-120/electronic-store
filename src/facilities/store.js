import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../facilities/productSlice";
import filterReducer from "../facilities/filterSlice";
import imageReducer from "../facilities/imageSlice";
import commonReducer from "../facilities/commonSlice";
import userReducer from "../facilities/userSlice";

export const store = configureStore({
    reducer: {
        products: productReducer,
        filters: filterReducer,
        images: imageReducer,
        common: commonReducer,
        user: userReducer,
    },
});
