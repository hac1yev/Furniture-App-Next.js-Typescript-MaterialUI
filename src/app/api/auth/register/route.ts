import { connectToDB } from "@/lib/connectToDB";
import { hashPassword } from "@/lib/hashedPassword";
import { User } from "@/models/User";

export async function POST(req: Request) {
    const { firstName, lastName, email, password, username } = await req.json();

    if(
        !firstName ||
        !lastName ||
        !username ||
        !email || 
        !password 
    ) {
        return Response.json({ message: 'All inputs are required!', status: 400 });
    }
    
    await connectToDB();

    const user = await User.findOne({ email });

    const isUsernameExist = await User.findOne({ username }); 

    if(isUsernameExist) {
        return Response.json({ message: 'This username is already taken!', status: 409 });
    };

    if(user) {
        return Response.json({ message: 'Email already exists!', status: 409 });
    };

    const hashedPassword = await hashPassword(password);

    const newUser = new User({ firstName, lastName, username, email, password: hashedPassword });

    await newUser.save();

    return Response.json({ status: 201 });
};