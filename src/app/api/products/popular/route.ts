import { connectToDB } from "@/lib/connectToDB";
import { Product } from "@/models/Product";

export async function GET(req: Request) {
    await connectToDB();

    const popularProducts = await Product.find().sort({ views: -1 }).limit(4);    

    return Response.json({ data: popularProducts });
};