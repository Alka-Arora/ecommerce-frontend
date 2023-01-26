
import { createSlice } from "@reduxjs/toolkit";

export const itemSlice = createSlice({
    name: "category",
    initialState: {
        value: "",
    },
    reducers: {
   
        addCategoryId: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const { addCategoryId } = itemSlice.actions;

export default itemSlice.reducer;