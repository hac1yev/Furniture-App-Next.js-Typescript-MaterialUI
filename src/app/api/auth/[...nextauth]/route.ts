import { connectToDB } from "@/lib/connectToDB";
import { isPasswordCorrect } from "@/lib/verifyPassword";
import { User } from "@/models/User";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

type ST = {
  session: {
    user : {
      name: string;
      email: string;
      img: string;
    }
  };
  token: any;
}

export const authOptions: any = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      type: 'credentials',
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const { username, password } = credentials as {
          username: string;
          password: string;
        };   

        if (!username || !password) {
          throw new Error("Username and password are required!");
        }

        await connectToDB();

        const user = await User.findOne({ username });

        if (!user) {
          throw new Error("No user found with the provided username.");
        }

        if(!user.isVerified) {
          throw new Error("This user is not verified!");
        }
  
        const passwordIsCorrect = await isPasswordCorrect(password, user.password);

        if (!passwordIsCorrect) {
          throw new Error("Incorrect password!");
        }

        return {
          id: user._id,
          username: user.username,
          email: user.email
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: any) {    
      if (user) {
        token.username = user.username;
        token.email = user.email;
      } 
      return token;
    },
    async session({ session, token }: ST) { 
      if (token) {
        session.user.name = token.username;
        session.user.email = token.email;
      }
      return session;
    }
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };