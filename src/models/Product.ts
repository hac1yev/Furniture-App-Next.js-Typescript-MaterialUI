import { Schema, model, models } from "mongoose";

const ProductSchema = new Schema({
    image: {
        type: String,
        required: true
    },
    furniture: {
        type: String
    },
    price: {
        type: Number,
        required: true
    },
    f_collection: {
        type: String
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    views: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

export const Product = models.Product || model("Product", ProductSchema);