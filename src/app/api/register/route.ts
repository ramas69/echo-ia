import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { email, password, name } = await req.json();

    const cleanEmail = email?.trim().toLowerCase();
    const cleanPassword = password?.trim();
    const cleanName = name?.trim();

    if (!cleanEmail || !cleanPassword) {
      return NextResponse.json(
        { message: "Champs manquants." },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: cleanEmail },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "Cet utilisateur existe déjà." },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(cleanPassword, 10);

    const user = await prisma.user.create({
      data: {
        email: cleanEmail,
        password: hashedPassword,
        name: cleanName,
        role: "STUDENT",
      },
    });

    return NextResponse.json({ 
      user: { email: user.email, name: user.name },
      message: "Inscription réussie !" 
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Erreur serveur." },
      { status: 500 }
    );
  }
}

