import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { email, password, name } = await req.json();

    // Nettoyer les données entrantes (trim des espaces)
    const cleanEmail = email?.trim().toLowerCase();
    const cleanPassword = password?.trim();
    const cleanName = name?.trim();

    console.log("🔵 INSCRIPTION - Tentative:", { 
      email: cleanEmail, 
      passwordLength: cleanPassword?.length,
      name: cleanName 
    });

    if (!cleanEmail || !cleanPassword) {
      console.log("❌ INSCRIPTION - Champs manquants");
      return NextResponse.json(
        { message: "Champs manquants." },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: cleanEmail },
    });

    if (existingUser) {
      console.log("❌ INSCRIPTION - Utilisateur existe déjà:", cleanEmail);
      return NextResponse.json(
        { message: "Cet utilisateur existe déjà." },
        { status: 400 }
      );
    }

    console.log("🔐 INSCRIPTION - Hachage du mot de passe...");
    const hashedPassword = await bcrypt.hash(cleanPassword, 10);
    console.log("✅ INSCRIPTION - Mot de passe haché, longueur hash:", hashedPassword.length);

    const user = await prisma.user.create({
      data: {
        email: cleanEmail,
        password: hashedPassword,
        name: cleanName,
        role: "STUDENT", // Default role
      },
    });

    console.log("✅ INSCRIPTION - Utilisateur créé avec succès:", {
      id: user.id,
      email: user.email,
      hasPassword: !!user.password,
      passwordHashLength: user.password?.length
    });

    return NextResponse.json({ 
      user: { email: user.email, name: user.name },
      message: "Inscription réussie !" 
    });
  } catch (error) {
    console.error("❌ INSCRIPTION - Erreur:", error);
    return NextResponse.json(
      { message: "Erreur serveur.", error: error instanceof Error ? error.message : "Unknown" },
      { status: 500 }
    );
  }
}

