import { connectToDB } from "@/lib/connectToDB";
import { hashPassword } from "@/lib/hashedPassword";
import { User } from "@/models/User";

export async function POST(req: Request) {
    const { firstName, lastName, email, password } = await req.json();

    if(
        !firstName ||
        !lastName ||
        !email || 
        !password
    ) {
        return Response.json({ message: 'All inputs are required!', status: 400 });
    }
    
    await connectToDB();

    const user = await User.findOne({ email });

    if(user) {
        return Response.json({ message: 'Email already exists!', status: 409 });
    };

    const hashedPassword = await hashPassword(password);

    const newUser = new User({ firstName, lastName, email, password: hashedPassword });

    await newUser.save();

    return Response.json({ status: 201 });
};