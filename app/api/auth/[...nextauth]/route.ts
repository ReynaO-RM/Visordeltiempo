import { prisma } from "@/app/lib/prisma";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";
import type { JWT } from "next-auth/jwt";

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const email = credentials?.email.trim().toLowerCase();
        const password = credentials?.password;
        if (!email || !password) {
          return null;
        }
        const user = await prisma.user.findUnique({
          where: { email },
        });
        if (!user) {
          return null;
        }
        const ok = user.password === password;
        if (!ok) {
          return null;
        }
        return {
          id: user.id.toString(),
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    jwt: async ({ token, user }: { token: JWT; user?: any }) => {
      if (user) {
        token.uid = user.id as string;
        token.email = user.email as string;
        token.name = user.name as string;
      }
      return token;
    },
    session: async ({ session, token }: { session: any; token: JWT }) => {
      if (session.user) {
        session.user.id = token.uid as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
      }
      return session;
    },
  },
};

export const runtime = "nodejs";

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
