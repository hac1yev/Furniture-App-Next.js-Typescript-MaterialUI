import { connectToDB } from "@/lib/connectToDB";
import { Favorite } from "@/models/Favorite";
import { getServerSession } from "next-auth";

export async function GET(req: Request) {
    const session = await getServerSession();
    const email = session?.user?.email;    

    await connectToDB();

    const userFavorites = await Favorite.findOne({ email });

    const populate = await userFavorites.populate('favorites');

    console.log(populate.favorites);

    if(userFavorites) {
        return Response.json({ favorites: populate.favorites });
    }else{
        return Response.json({ message: 'There is no favorite product!!!' })
    }
};