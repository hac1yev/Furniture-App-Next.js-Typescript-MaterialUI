import { connectToDB } from "@/lib/connectToDB";
import { ShoppingCart } from "@/models/ShoppingCart";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";

export async function POST(req: Request, { params }: { params: { productId: string } }){
    const productId = params.productId;
    const { count } = await req.json();
    const session: any = await getServerSession(authOptions);
    const username = session?.user?.name;    

    await connectToDB();
    const shoppingCart = await ShoppingCart.findOne({ username });

    if(shoppingCart) {
        const existingProduct = shoppingCart.products.find((item: { 
            _id: string; 
            product: string;
            count: number;
        }) => item.product.toString() === productId);
        if(existingProduct) {
            await ShoppingCart.updateOne(
                { username, "products.product": productId },
                { $inc: { "products.$.count": count } }
            );
        }else{
            await ShoppingCart.updateOne({ username }, { $push: { products: { product: productId, count } } });
        }

    }else{
        const new_shopping = new ShoppingCart({ username, products: [{ product: productId, count }] });
        await new_shopping.save();
    }

    const products = await ShoppingCart.findOne({ username }).populate("products.product");    

    return Response.json({ products: products.products });
};