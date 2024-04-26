import { compare } from "bcrypt";

export async function isPasswordCorrect(enteredPassword: string, userHashedPassword: string) {
    const isPasswordCorrect = await compare(enteredPassword, userHashedPassword);

    return isPasswordCorrect;
}; 