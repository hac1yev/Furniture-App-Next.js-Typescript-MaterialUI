"use client";

import { Grid } from "@mui/material";
import ProductItem from "./ProductItem";

const ProductList = ({ filteredProducts, productPage }: ProductListCompTypes) => {   
    return (
        <Grid container sm={12} md={9} lg={9}>
          {filteredProducts
              .slice((productPage - 1) * 9, productPage * 9)
              ?.map((item) => (
                <ProductItem       
                    key={item._id} 
                    id={item._id}
                    image={item.image}
                    furniture={item.furniture}
                    title={item.title}
                    price={item.price}
                />
              ))}
        </Grid>
    );
};

export default ProductList;