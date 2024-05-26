import { createSlice } from "@reduxjs/toolkit";

interface RootState<T> {
    myShoppingProducts: T[];
    isLoading: boolean;
    oneItemPrice: null | number;
}

const initialState: RootState<MyShoppingProductTypes> = {
    myShoppingProducts: [],
    isLoading: true,
    oneItemPrice: null
};

export const shoppingSlice = createSlice({
    name: 'shoppingSlice',
    initialState,
    reducers: {
        getAllShoppingProducts(state, action) {
            state.myShoppingProducts = action.payload.products;
            state.isLoading = action.payload.isLoading;
        },
        deleteShoppingProduct(state, action) {
            state.myShoppingProducts = state.myShoppingProducts.filter(item => item.product._id !== action.payload);
        },
        increaseCount(state, action){
            const findedProductIndex = state.myShoppingProducts.findIndex(item => item.product._id === action.payload);

            if(findedProductIndex !== -1) {
                state.myShoppingProducts[findedProductIndex].count += 1;
            }
        },
        decreaseCount(state, action){
            const findedProductIndex = state.myShoppingProducts.findIndex(item => item.product._id === action.payload);
            
            if(findedProductIndex !== -1) {
                state.myShoppingProducts[findedProductIndex].count -= 1;
            }
        },
        getOneItemPrice(state,action) {
            state.oneItemPrice = action.payload;
        },
        clearShoppingProducts(state) {
            state.myShoppingProducts = [];
        }
    },
});

export const shoppingSliceActions = shoppingSlice.actions;

export default shoppingSlice.reducer;
