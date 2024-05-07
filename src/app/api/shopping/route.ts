import { connectToDB } from "@/lib/connectToDB";
import { ShoppingCart } from "@/models/ShoppingCart";
import { getServerSession } from "next-auth";

export async function GET() {
    const session = await getServerSession();
    const email = session?.user?.email;

    await connectToDB();

    const shopping_cart = await ShoppingCart.findOne({ email }).populate('products');

    console.log(shopping_cart);
    

    if (shopping_cart) {
        return Response.json({ products: shopping_cart.products });
    } else {
        return Response.json({ message: 'There is no shop product!!!' });
    }
};
