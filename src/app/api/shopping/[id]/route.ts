import { connectToDB } from "@/lib/connectToDB";
import { ShoppingCart } from "@/models/ShoppingCart";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function DELETE(req: Request, { params }: { params: { id: string } }) {    
    const { id } = params;       
    
    const session: any = await getServerSession(authOptions);
    const username = session?.user?.name;

    await connectToDB();

    const shoppingProducts = await ShoppingCart.findOneAndUpdate({ username }, { $pull: { products: { product: id } } });
    await shoppingProducts.save();

    return Response.json({ message: 'Deleted!' })  
};