import { Schema, model, models } from "mongoose";
import { Product } from "./Product";

const FavoriteSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    favorites: [
        {
          type: Schema.Types.ObjectId,
          ref: Product 
        },
    ],
}, { timestamps: true });

export const Favorite = models.Favorite || model("Favorite", FavoriteSchema);