import { createSlice } from "@reduxjs/toolkit";

const initialProductsState = {
    products: [],
    categoryCollection: [],
    filteredProducts: []
};

export const productsSlice = createSlice({
    name: 'productsSlice',
    initialState: initialProductsState,
    reducers: {
        getAllProducts(state: ProductSliceTypes, action) {
            state.products = [...action.payload]
            state.filteredProducts = [...action.payload]
        },
        addCatCol(state: ProductSliceTypes, action) {
            state.categoryCollection = [...state.categoryCollection, action.payload];
            state.filteredProducts = state.products;
            
            const filteredProducts = state.filteredProducts.filter((product) => (
                state?.categoryCollection?.some((category: string) => (
                    product?.furniture?.includes(category) || product?.f_collection?.includes(category) 
                ))
            ));
                    
            // Convert Proxy object to plain JavaScript object for logging
            const plainFilteredProducts = JSON.parse(JSON.stringify(filteredProducts));
            
            state.filteredProducts = plainFilteredProducts;
        },
        removeCatCol(state: ProductSliceTypes, action) {
            state.categoryCollection = state.categoryCollection.filter((item: string) => (
                item !== action.payload
            ));
            if(state.categoryCollection.length === 0) {
                state.filteredProducts = state.products
            }else{
                const filteredProducts = state.filteredProducts.filter((product) => (
                    state?.categoryCollection?.some((category: string) => (
                        product?.furniture?.includes(category) || product?.f_collection?.includes(category) 
                    ))
                ));
                        
                const plainFilteredProducts = JSON.parse(JSON.stringify(filteredProducts));
                
                state.filteredProducts = plainFilteredProducts;
            }
        },
        clearCatCol(state) {
            state.categoryCollection = [];
        },
        sortPriceAtoZ(state: ProductSliceTypes) {
            state.filteredProducts.sort((a, b) => a.title.localeCompare(b.title));
        },
        sortPriceHighToLow(state: ProductSliceTypes) {
            state.filteredProducts.sort((a, b) => b.price - a.price);
        },
        sortPriceLowToHigh(state: ProductSliceTypes) {
            state.filteredProducts.sort((a, b) => a.price - b.price);
        },
    }
});

export const productsSliceAction = productsSlice.actions;