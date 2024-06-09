import { connectToDB } from "@/lib/connectToDB";
import { Favorite } from "@/models/Favorite";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export async function POST(req: Request) {
    const { id } = await req.json();
    const session: any = await getServerSession(authOptions);
    const username = session?.user?.name;     

    await connectToDB();

    let favoriteUser = await Favorite.findOne({ username });

    if (favoriteUser) {        
        await Favorite.updateOne({username}, { $push: { favorites: id } });
        await favoriteUser.save();
    } else {
        const favoriteUser = new Favorite({ username, favorites: [id] });
        await favoriteUser.save(); 
    }

    return Response.json({ message: 'Product added!!!' });
};

export async function DELETE(req: Request) {
    const { id } = await req.json();
    const session: any = await getServerSession(authOptions);
    const username = session?.user?.name;    

    await connectToDB();

    await Favorite.findOneAndUpdate({ username }, { $pull: { favorites: id } });
    
    revalidatePath("/profile");

    return Response.json({ message: 'Product deleted!!!' })
};

export async function GET(req: Request) {
    const session: any = await getServerSession(authOptions);
    const username = session?.user?.name;    

    await connectToDB();

    const userFavorites = await Favorite.findOne({ username });

    if(userFavorites) {
        return Response.json({ data: userFavorites });
    }else{
        return Response.json({ 
        data: { favorites: [] }, 
        message: 'There is no favorite product!!!' 
    });
    }
};