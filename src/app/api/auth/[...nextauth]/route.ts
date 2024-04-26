import { connectToDB } from "@/lib/connectToDB";
import { isPasswordCorrect } from "@/lib/verifyPassword";
import { User } from "@/models/User";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

type CredentialsType = {
  email: string;
  password: string;
};

const handler = NextAuth({
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Email", type: "email", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: CredentialsType, req: any) {
        const { email, password } = credentials;   
        
        await connectToDB();

        const user = await User.findOne({ email });
        
        const passwordIsCorrect = await isPasswordCorrect(password, user.password);

        

        if(passwordIsCorrect) {
          return {
            id: user._id,
            email: user.email
          };
        };

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      return token;
    },
    async session({ session }: any) {    
      return session;
    }
  }
});

export { handler as GET, handler as POST };