import NextAuth, { NextAuthOptions } from "next-auth";
import { NextApiHandler } from "next";
import CredentialProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

import bcrypt from "bcrypt";
import prisma from "lib/prisma";
import axios from "axios";

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options);
export default authHandler;

const options: NextAuthOptions = {
  debug: true,
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "john.doe@email.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "password",
        },
      },

      authorize: async (credentials) => {
        const dbUser = await prisma.user.findUnique({
          where: { email: credentials?.email },
          select: { email: true, username: true, password: true, name: true },
        });

        console.log(credentials); //bcrypt is missing

        if (!dbUser) {
          console.log(`No user with email ${credentials?.email}`);
        }

        if (dbUser) {
          if (dbUser.password === credentials?.password) {
            return dbUser;
          } else {
            console.log(`incorrect password for ${dbUser.username}`);
          }
        }

        // const hash = await bcrypt.hash(credentials.password, 10);
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },

  callbacks: {
    jwt(params) {
      // update token
      if (params.user?.role) {
        params.token.role = params.user.role;
      }
      // return final_token
      return params.token;
    },
  },
  secret: process.env.JWT_SECRET,
};
