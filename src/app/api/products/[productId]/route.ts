import { connectToDB } from "@/lib/connectToDB";
import { Product } from "@/models/Product";

export async function GET(req: Request, { params }: { params: { productId: string } }) {
    const productId = params.productId;

    await connectToDB();

    const product = await Product.findById({ _id: productId });
    
    if(!product){
        throw new Error("There is no product like this.");    
    }else{
        await Product.findByIdAndUpdate({ _id: productId }, { $inc: { views: 1 } }, { new: true }); 
    }

    return Response.json({ data: product });
};