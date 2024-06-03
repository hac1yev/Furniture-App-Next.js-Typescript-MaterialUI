"use client";

import { Suspense, memo } from "react";
import AllProducts from "./AllProducts";

const ProductsPageWrapper = () => {
    return (
        <Suspense>
            <AllProducts />
        </Suspense>
    );
};

export default memo(ProductsPageWrapper);