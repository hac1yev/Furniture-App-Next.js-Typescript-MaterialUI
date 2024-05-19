export const dynamic = 'force-dynamic';
import { connectToDB } from "@/lib/connectToDB";
import { Product } from "@/models/Product";

export async function GET() {
    await connectToDB();

    const popularProducts = await Product.find().sort({ views: -1 }).limit(4);    

    return Response.json({ data: popularProducts });
};