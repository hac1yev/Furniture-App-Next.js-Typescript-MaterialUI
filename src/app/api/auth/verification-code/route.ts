import { connectToDB } from "@/lib/connectToDB";
import { User } from "@/models/User";

export async function POST(req: Request) {
    const { verificationCode, token } = await req.json();

    await connectToDB();

    const user = await User.findOne({ forgotPasswordToken: token, forgotPasswordTokenExpiry: {$gt: Date.now()}});

    if(user.verificationCode !== verificationCode) {
        return Response.json({ message: "Verification code isn't correct!", status: 404 });
    }

    if(user.verificationCode === verificationCode) {
        user.verificationCode = undefined;
        await user.save();

        return Response.json({ message: 'Success!', status: 200 });
    }
};