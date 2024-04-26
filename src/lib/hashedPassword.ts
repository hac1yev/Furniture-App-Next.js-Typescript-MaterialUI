import { hash } from "bcrypt";

export async function hashPassword(password: string) {
    const hashedPassword = await hash(password, 10);

    return hashedPassword;
};