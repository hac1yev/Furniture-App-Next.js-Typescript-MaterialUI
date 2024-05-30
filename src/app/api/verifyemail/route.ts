import { User } from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/connectToDB";


export async function POST(request: NextRequest){
    await connectToDB();

    try {
        const reqBody = await request.json()
        const {token} = reqBody;

        const user = await User.findOne({verifyToken: token, verifyTokenExpiry: {$gt: Date.now()}});

        console.log(user);

        if (!user) {
            return NextResponse.json({error: "Invalid token"}, {status: 400})
        }

        await User.findOneAndUpdate({ verifyToken: token }, { isVerified: true });
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        await user.save();
        
        return NextResponse.json({
            message: "Email verified successfully",
            success: true
        })


    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }

}