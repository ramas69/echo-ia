import NextAuth from "next-auth";
import prisma from "@/lib/prisma";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { authConfig } from "./auth.config";

export const { auth, handlers, signIn, signOut } = NextAuth({
  ...authConfig,
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const cleanEmail = (credentials.email as string).trim().toLowerCase();
        const cleanPassword = (credentials.password as string).trim();

        const user = await prisma.user.findUnique({
          where: { email: cleanEmail },
        });

        if (!user || !user.password) {
          return null;
        }

        const isValid = await bcrypt.compare(cleanPassword, user.password);

        if (!isValid) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role as "ADMIN" | "STUDENT",
        };
      },
    }),
  ],
});
