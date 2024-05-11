import { connectToDB } from "@/lib/connectToDB";
import { ShoppingCart } from "@/models/ShoppingCart";
import { getServerSession } from "next-auth";

export async function DELETE(req: Request, { params }: { params: { id: string } }) {    
    const { id } = params;       
    
    const session = await getServerSession();
    const email = session?.user?.email;

    const shoppingProducts = await ShoppingCart.findOneAndUpdate({ email }, { $pull: { products: { product: id } } });
    await shoppingProducts.save();

    return Response.json({ message: 'Deleted!' })  
};