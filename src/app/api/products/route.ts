import { connectToDB } from "@/lib/connectToDB";
import { Product } from "@/models/Product";

export async function GET() {
    await connectToDB();

    const all_furnitures = await Product.find();

    return Response.json({ data: all_furnitures });
};
