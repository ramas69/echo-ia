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
          console.log("❌ CONNEXION - Credentials manquants");
          return null;
        }

        // Nettoyer les données (trim et lowercase pour l'email)
        const cleanEmail = (credentials.email as string).trim().toLowerCase();
        const cleanPassword = (credentials.password as string).trim();

        console.log("🔵 CONNEXION - Tentative:", { 
          email: cleanEmail,
          passwordLength: cleanPassword.length 
        });

        const user = await prisma.user.findUnique({
          where: { email: cleanEmail },
        });

        console.log("🔍 CONNEXION - Utilisateur trouvé:", !!user);

        if (!user || !user.password) {
          console.log("❌ CONNEXION - Utilisateur non trouvé ou pas de mot de passe");
          return null;
        }

        console.log("🔐 CONNEXION - Vérification du mot de passe...", {
          hasStoredPassword: !!user.password,
          storedPasswordLength: user.password.length,
          inputPasswordLength: cleanPassword.length
        });

        const isValid = await bcrypt.compare(
          cleanPassword,
          user.password
        );

        console.log(isValid ? "✅ CONNEXION - Mot de passe valide" : "❌ CONNEXION - Mot de passe invalide");

        if (!isValid) return null;

        console.log("✅ CONNEXION - Authentification réussie pour:", user.email);

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
