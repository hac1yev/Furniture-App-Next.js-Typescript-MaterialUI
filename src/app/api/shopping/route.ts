import { connectToDB } from "@/lib/connectToDB";
import { ShoppingCart } from "@/models/ShoppingCart";
import { getServerSession } from "next-auth";

export async function GET() {
    const session = await getServerSession();
    const email = session?.user?.email;

    await connectToDB();

    const products = await ShoppingCart.findOne({ email }).populate("products.product");    

    if (products) {
        return Response.json({ data: products });
    } else {
        return Response.json({ message: 'There is no shop product!!!' });
    }
};

export async function PUT(req: Request) {
    try {
        const { count_type, id } = await req.json();
        const session = await getServerSession();
        const email = session?.user?.email;    

        await connectToDB();
        const shoppingCart = await ShoppingCart.findOne({ email });

        const existingProduct = shoppingCart.products.find((item: { 
            _id: string; 
            product: string;
            count: number;
        }) => item.product.toString() === id);
        console.log(existingProduct);
        

        if(count_type === 'increase') {            
            await ShoppingCart.updateOne(
                { email, "products.product": id },
                { $inc: { "products.$.count": 1 } }
            );
        } else if(count_type === 'decrease') {
            await ShoppingCart.updateOne(
                { email, "products.product": id },
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
    const session = await getServerSession();
    const email = session?.user?.email;

    await connectToDB();

    await ShoppingCart.deleteOne({ email });    

    return Response.json({ message: 'Paid' });
};