import { configureStore } from "@reduxjs/toolkit";
import { favoriteSlice } from "./favorite-slice";
import { shoppingSlice } from "./shopping-slice";

export const store = configureStore({
    reducer: {
        favoriteReducer: favoriteSlice.reducer,
        shoppingReducer: shoppingSlice.reducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
}); 
