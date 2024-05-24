import { connectToDB } from "@/lib/connectToDB";
import { Favorite } from "@/models/Favorite";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export async function POST(req: Request) {
    const { id } = await req.json();
    const session = await getServerSession();
    const email = session?.user?.email;    

    await connectToDB();

    let favoriteUser = await Favorite.findOne({ email });

    if (favoriteUser) {        
        await Favorite.updateOne({email}, { $push: { favorites: id } });
        await favoriteUser.save();
    } else {
        const favoriteUser = new Favorite({ email, favorites: [id] });
        await favoriteUser.save(); 
    }

    return Response.json({ message: 'Product added!!!' });
};

export async function DELETE(req: Request) {
    const { id } = await req.json();
    const session = await getServerSession();
    const email = session?.user?.email;    

    await connectToDB();

    await Favorite.findOneAndUpdate({ email }, { $pull: { favorites: id } });
    
    revalidatePath("/profile");

    return Response.json({ message: 'Product deleted!!!' })
};

export async function GET(req: Request) {
    const session = await getServerSession();
    const email = session?.user?.email;    

    await connectToDB();

    const userFavorites = await Favorite.findOne({ email });

    if(userFavorites) {
        return Response.json({ data: userFavorites });
    }else{
        return Response.json({ 
        data: { favorites: [] }, 
        message: 'There is no favorite product!!!' 
    });
    }

};