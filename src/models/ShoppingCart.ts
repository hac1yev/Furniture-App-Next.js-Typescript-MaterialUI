import { Schema, models } from "mongoose";
import { Product } from "./Product";
import { model } from "mongoose";

const ProductInCartSchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: Product,
        required: true
    },
    count: {
        type: Number,
        required: true,
        default: 1 
    }
});

const ShoppingCartSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    products: [ProductInCartSchema] 
}, { timestamps: true });

export const ShoppingCart = models.ShoppingCart || model("ShoppingCart", ShoppingCartSchema);
