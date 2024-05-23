import { createSlice } from "@reduxjs/toolkit";

type ProductType = {
    _id: string;
    description: string;
    title: string;
    price: number;
    furniture: string;
    image: string;
    f_collection: string;
};
  
type AllProductsType = {
    products: ProductType[];
    categoryCollection: string[];
    filteredProducts: ProductType[];
};

const initialProductsState = {
    products: [],
    categoryCollection: [],
    filteredProducts: []
};

export const productsSlice = createSlice({
    name: 'productsSlice',
    initialState: initialProductsState,
    reducers: {
        getAllProducts(state: AllProductsType, action) {
            state.products = [...action.payload]
            state.filteredProducts = [...action.payload]
        },
        addCatCol(state: AllProductsType, action) {
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
        removeCatCol(state: AllProductsType, action) {
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
        sortPriceAtoZ(state: AllProductsType) {
            state.filteredProducts.sort((a, b) => a.title.localeCompare(b.title));
        },
        sortPriceHighToLow(state: AllProductsType) {
            state.filteredProducts.sort((a, b) => b.price - a.price);
        },
        sortPriceLowToHigh(state: AllProductsType) {
            state.filteredProducts.sort((a, b) => a.price - b.price);
        },
    }
});

export const productsSliceAction = productsSlice.actions;