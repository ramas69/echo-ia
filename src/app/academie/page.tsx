import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import AcademieClient from "./AcademieClient";

export default async function AcademiePage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/login");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: { progress: true },
  });

  if (!user) {
    redirect("/auth/login");
  }

  // Calculate progress percentage
  const totalLessons = await prisma.lesson.count();
  const completedLessons = user.progress.filter(p => p.completed).length;
  const progressPercent = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  return (
    <AcademieClient 
      userName={user.name || "Membre"} 
      initialProgress={progressPercent}
    />
  );
}
