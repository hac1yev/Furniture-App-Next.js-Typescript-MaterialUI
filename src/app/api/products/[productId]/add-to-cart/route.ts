import { connectToDB } from "@/lib/connectToDB";
import { Product } from "@/models/Product";
import { ShoppingCart } from "@/models/ShoppingCart";
import { getServerSession } from "next-auth";

export async function POST(req: Request,{ params }: { params: { productId: string } }){
    const productId = params.productId;
    const { count } = await req.json();
    const session = await getServerSession();
    const email = session?.user?.email;

    await connectToDB();
    const shopping_cart = await ShoppingCart.findOne({ email });

    if(shopping_cart) {
        await ShoppingCart.updateOne({ email }, { $push: { products: productId } });
    }else{
        const new_shopping = new ShoppingCart({ email, products: [productId] });
        await new_shopping.save();
    }

    return Response.json({ message: 'Added!' });
};
