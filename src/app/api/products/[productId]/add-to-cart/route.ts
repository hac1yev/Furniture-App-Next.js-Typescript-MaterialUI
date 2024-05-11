import { connectToDB } from "@/lib/connectToDB";
import { ShoppingCart } from "@/models/ShoppingCart";
import { getServerSession } from "next-auth";

export async function POST(req: Request,{ params }: { params: { productId: string } }){
    const productId = params.productId;
    const { count } = await req.json();
    const session = await getServerSession();
    const email = session?.user?.email;

    await connectToDB();
    const shoppingCart = await ShoppingCart.findOne({ email });

    if(shoppingCart) {
        const existingProduct = shoppingCart.products.find((item: { 
            _id: string; 
            product: string;
            count: number;
        }) => item.product.toString() === productId);
        if(existingProduct) {
            await ShoppingCart.updateOne(
                { email, "products.product": productId },
                { $inc: { "products.$.count": count } }
            );
        }else{
            await ShoppingCart.updateOne({ email }, { $push: { products: { product: productId, count } } });
        }

    }else{
        const new_shopping = new ShoppingCart({ email, products: [{ product: productId, count }] });
        await new_shopping.save();
    }

    const products = await ShoppingCart.findOne({ email }).populate("products.product");    

    return Response.json({ products: products.products });
};