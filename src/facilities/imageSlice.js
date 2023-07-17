import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    selectedImage: ''
}

const imageSlice = createSlice({
    name: "image",
    initialState,
    reducers: {
        updateImage: (state, action) => {
            state.selectedImage = action.payload;
        }
    }
})


export const { updateImage } = imageSlice.actions;
export default imageSlice.reducer;