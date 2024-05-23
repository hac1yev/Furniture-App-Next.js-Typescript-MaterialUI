"use client";

import { productsSliceAction } from "@/store/products-slice";
import { useDispatch } from "react-redux";

const useCatCol = () => {
    const dispatch = useDispatch();

    const handleCatColChange = (title: string, event: React.ChangeEvent<HTMLInputElement>) => {
        if(event.target.checked){
            dispatch(productsSliceAction.addCatCol(title.toLocaleLowerCase()));
        }else{
            dispatch(productsSliceAction.removeCatCol(title.toLocaleLowerCase()));
        }
    };

    return handleCatColChange;
}

export default useCatCol