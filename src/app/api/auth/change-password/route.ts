import { connectToDB } from "@/lib/connectToDB";
import { User } from "@/models/User";
import { hash } from "bcrypt";

export async function POST(req: Request) {
    const { newPassword, token } = await req.json();

    await connectToDB();

    const user = await User.findOne({ forgotPasswordToken: token, forgotPasswordTokenExpiry: {$gt: Date.now()}});

    if(user) {
        const hashedNewPassword = await hash(newPassword, 10);

        await User.findOneAndUpdate({ forgotPasswordToken: token, forgotPasswordTokenExpiry: {$gt: Date.now()}}, { password: hashedNewPassword})        

        user.forgotPasswordToken = undefined;
        user.forgotPasswordTokenExpiry = undefined;
        await user.save();

        return Response.json({ message: "Your password has changed!", status: 200 });
    }

    if(!user) {
        return Response.json({ message: "Can not find user!", status: 404 });
    }

}