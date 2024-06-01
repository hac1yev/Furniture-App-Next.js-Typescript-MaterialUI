import { connectToDB } from "@/lib/connectToDB";
import { sendEmail } from "@/lib/mailer";
import { User } from "@/models/User";

export async function POST(req: Request) {
    try {
        const { email, username } = await req.json();

        await connectToDB();

        const user = await User.findOne({ username, email });

        if (!user) {
            return Response.json({ message: 'User with this username and email does not exist.', status: 404 });
        }

        if(!user.isVerified) {
            return Response.json({ message: 'User is not verified.', status: 404 });
        }

        await sendEmail({ email, emailType: "RESET", userId: user._id });

        return Response.json({ message: 'Success!', status: 200 });
    } catch (error) {
        return Response.json({ message: 'Server Error', status: 500  });
    }
}
