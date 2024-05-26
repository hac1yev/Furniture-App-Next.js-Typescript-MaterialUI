import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialFavoriteState: FavoriteSliceTypes = {
  selectedId: [],
  allFavorites: [],
};

export const favoriteSlice = createSlice({
  name: 'favoriteSlice',
  initialState: initialFavoriteState,
  reducers: {
    getAllFavorites(state, action: PayloadAction<ProductTypes[]>) {
      state.allFavorites = action.payload;
    },
    getSelectedIds(state, action: PayloadAction<string[]>) {
      state.selectedId = action.payload;
    },
    addFavorites(state, action: PayloadAction<string>) {
      state.selectedId.push(action.payload);
    },
    removeFavorites(state, action: PayloadAction<string>) {
      state.selectedId = state.selectedId.filter(item => item !== action.payload);
      state.allFavorites = state.allFavorites.filter((item: ProductTypes) => item._id !== action.payload);
    }
  },
});

export const favoriteSliceAction = favoriteSlice.actions;
