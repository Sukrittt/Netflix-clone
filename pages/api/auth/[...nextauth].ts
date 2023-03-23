import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcrypt";

import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prismadb from "@/lib/prismadb";

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),

    //defining a credential structure with id and name
    Credentials({
      id: "credentials",
      name: "Credentials",

      //defining what our credentials will contain
      credentials: {
        email: {
          label: "Email",
          type: "text",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },

      //a function to check authentication details
      async authorize(credentials) {
        //if both email and password is not entered
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and Password required");
        }

        const user = await prismadb.user.findUnique({
          //find a user whose email matches the credeneitals.email.
          where: {
            email: credentials.email,
          },
        });

        if (!user || !user.hashedPassword) {
          throw new Error("Email does not exist");
        }

        //checking the password entered with the password in the database.
        const isCorrectPassword = await compare(
          credentials.password,
          user.hashedPassword
        );
        if (!isCorrectPassword) {
          throw new Error("Incorrect Password");
        }

        return user; //authentication successfull
      },
    }),
  ],

  //nextAuth will look for the "/auth" page for signIn purpose.
  pages: {
    signIn: "/auth",
  },

  debug: process.env.NODE_ENV === "development",
  adapter: PrismaAdapter(prismadb),

  session: {
    //which session strategy to use
    strategy: "jwt",
  },

  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
  },

  secret: process.env.NEXTAUTH_SECRET,
});
