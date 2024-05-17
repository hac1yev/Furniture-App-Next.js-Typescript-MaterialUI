import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false
};

export const loadingSlice = createSlice({
    name: 'loadingSlice',
    initialState,
    reducers: {
        itIsLoading(state, action) {
            state.isLoading = action.payload;
        },
        itIsNotLoading(state, action) {
            state.isLoading = action.payload;
        },
    },
});

export const loadingSliceActions = loadingSlice.actions;