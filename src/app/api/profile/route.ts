import { connectToDB } from "@/lib/connectToDB";
import { User } from "@/models/User";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";

export async function GET(req: Request) {
    const session: any = await getServerSession(authOptions);

    const username = session?.user?.name;    

    await connectToDB();

    const user = await User.findOne({ username });    

    return Response.json({ user });
};

export async function PUT(req: Request) {
    const data = await req.json();

    const session: any = await getServerSession(authOptions);

    const username = session?.user?.name;

    await connectToDB();

    await User.updateOne({username}, {...data});

    return Response.json({ message: 'Success!!!' });
};