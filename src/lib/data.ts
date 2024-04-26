import { Product } from "@/models/Product";
import { connectToDB } from "./connectToDB";

export async function fetchSearchResult(q: string, page: string) {
    const regex = new RegExp(q, "i");
    const ITEM_PER_PAGE = 8;

    try {
        await connectToDB();
        const count = await Product.countDocuments({ 
            $or: [
                { title: { $regex: regex } }, 
                { description: { $regex: regex } }, 
                { furniture: { $regex: regex } }, 
                { f_collection: { $regex: regex } }, 
            ]
        });
        const products = await Product.find({ 
            $or: [
                { title: { $regex: regex } }, 
                { description: { $regex: regex } }, 
                { furniture: { $regex: regex } },
                { f_collection: { $regex: regex } },
            ] 
        }).limit(ITEM_PER_PAGE).skip(ITEM_PER_PAGE * (parseInt(page) - 1));        

        return { products, count };
    } catch (error) {
        console.log(error);
        throw new Error('Failed to fetch users!');
    }
};