"use client";

import { Suspense } from "react";
import AllProducts from "./AllProducts";

const ProductsPageWrapper = () => {
    return (
        <Suspense>
            <AllProducts />
        </Suspense>
    );
};

export default ProductsPageWrapper;