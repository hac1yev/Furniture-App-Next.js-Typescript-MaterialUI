import { createSlice } from "@reduxjs/toolkit";

type SelectedIdTypes = {
    selectedId: string[]
};

const initialFavoriteState = {
    selectedId: []
};

export const favoriteSlice = createSlice({
    name: 'favoriteSlice',
    initialState: initialFavoriteState,
    reducers: {
        getSelectedIds(state: SelectedIdTypes, action) {
            state.selectedId = [...action.payload];
        },
        addFavorites(state: SelectedIdTypes, action) {
            state.selectedId = [...state?.selectedId, action.payload];
        },
        removeFavorites(state: SelectedIdTypes, action) {
            state.selectedId = state?.selectedId?.filter((item) => item !== action.payload);
        }
    },
});

export const favoriteSliceAction= favoriteSlice.actions;