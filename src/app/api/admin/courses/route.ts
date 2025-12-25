import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

export async function POST(req: Request) {
  const session = await auth();
  // @ts-ignore
  if (!session || session.user?.role !== "ADMIN") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { title, description, modules } = await req.json();

    const course = await prisma.course.create({
      data: {
        title,
        description,
        modules: {
          create: modules.map((mod: any, mIdx: number) => ({
            title: mod.title,
            description: mod.description,
            outcome: mod.outcome,
            order: mIdx,
            lessons: {
              create: mod.lessons.map((lsn: any, lIdx: number) => ({
                title: lsn.title,
                duration: lsn.duration,
                videoUrl: lsn.videoUrl,
                content: lsn.content,
                order: lIdx,
              }))
            }
          }))
        }
      }
    });

    return NextResponse.json(course);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error creating course" }, { status: 500 });
  }
}

