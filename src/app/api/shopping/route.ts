import { connectToDB } from "@/lib/connectToDB";
import { ShoppingCart } from "@/models/ShoppingCart";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
    const session: any = await getServerSession(authOptions);
    const username = session?.user?.name;

    await connectToDB();

    const products = await ShoppingCart.findOne({ username }).populate("products.product");    

    if (products) {
        return Response.json({ data: products });
    } else {
        return Response.json({ message: 'There is no shop product!!!' });
    }
};

export async function PUT(req: Request) {
    try {
        const { count_type, id } = await req.json();
        const session: any = await getServerSession(authOptions);
        const username = session?.user?.name;    

        await connectToDB();
 
        if(count_type === 'increase') {            
            await ShoppingCart.updateOne(
                { username, "products.product": id },
                { $inc: { "products.$.count": 1 } }
            );
        } else if(count_type === 'decrease') {
            await ShoppingCart.updateOne(
                { username, "products.product": id },
                { $inc: { "products.$.count": -1 } }
            );
        }

        return Response.json({ message: 'Updated!' });
    } catch (error) {
        console.error('Error:', error);
        return Response.json({ error: 'Internal Server Error' });
    }
}

export async function DELETE() {
    const session: any = await getServerSession(authOptions);
    const username = session?.user?.name;

    await connectToDB();

    await ShoppingCart.deleteOne({ username });    

    return Response.json({ message: 'Paid!' });
};