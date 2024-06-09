import { connectToDB } from "@/lib/connectToDB";
import { Favorite } from "@/models/Favorite";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";

export async function GET(req: Request) {
    const session: any = await getServerSession(authOptions);
    const username = session?.user?.name;    

    await connectToDB();

    const userFavorites = await Favorite.findOne({ username });

    const populate = await userFavorites.populate('favorites');

    if(userFavorites) {
        return Response.json({ favorites: populate.favorites });
    }else{
        return Response.json({ message: 'There is no favorite product!!!' })
    }
};