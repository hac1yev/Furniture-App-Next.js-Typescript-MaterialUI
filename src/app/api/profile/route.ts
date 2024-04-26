import { connectToDB } from "@/lib/connectToDB";
import { User } from "@/models/User";
import { getServerSession } from "next-auth";

export async function GET(req: Request) {
    const session = await getServerSession();

    const email = session?.user?.email;

    await connectToDB();

    const user = await User.findOne({ email });

    return Response.json({ user });
};

export async function PUT(req: Request) {
    const data = await req.json();

    const session = await getServerSession();

    const email = session?.user?.email;

    await connectToDB();

    await User.updateOne({email}, {...data});

    return Response.json({ message: 'Success!!!' });
};