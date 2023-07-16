import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    categoryList: []
}

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        addCategory: (state, { payload }) => {
            state.categoryList.push(payload);
            console.log(state.categoryList[0])
        },
        removeCategory: (state, { payload }) => {
            state.categoryList = state.categoryList.filter((category) => category !== payload);
            console.log("remove")
            console.log(state.categoryList[0])
        }
    }
});

export const { addCategory, removeCategory } = filterSlice.actions;
// export const { filterSmartphones, filterLaptops, filterSkincare, filterFragrances } = filterSlice.actions;
export default filterSlice.reducer;