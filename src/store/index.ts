import { configureStore } from "@reduxjs/toolkit";
import { favoriteSlice } from "./favorite-slice";
import { shoppingSlice } from "./shopping-slice";
import { loadingSlice } from "./loading-slice";
import { productsSlice } from "./products-slice";

export const store = configureStore({
    reducer: {
        favoriteReducer: favoriteSlice.reducer,
        shoppingReducer: shoppingSlice.reducer,
        loadingReducer: loadingSlice.reducer,
        productsReducer: productsSlice.reducer
    },
    devTools: process.env.NODE_ENV !== 'production',
}); 
