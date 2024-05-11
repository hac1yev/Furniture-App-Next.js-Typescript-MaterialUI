import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type FurnitureType = {
  _id: string;
  description: string;
  price: number;
  furniture: string;
  image: string;
};

type SelectedIdTypes = {
  selectedId: string[];
  allFavorites: FurnitureType[];
};

const initialFavoriteState: SelectedIdTypes = {
  selectedId: [],
  allFavorites: [],
};

export const favoriteSlice = createSlice({
  name: 'favoriteSlice',
  initialState: initialFavoriteState,
  reducers: {
    getAllFavorites(state, action: PayloadAction<FurnitureType[]>) {
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
    }
  },
});

export const favoriteSliceAction = favoriteSlice.actions;
