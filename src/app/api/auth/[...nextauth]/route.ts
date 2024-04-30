import { connectToDB } from "@/lib/connectToDB";
import { isPasswordCorrect } from "@/lib/verifyPassword";
import { User } from "@/models/User";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      type: 'credentials',
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };   
        
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