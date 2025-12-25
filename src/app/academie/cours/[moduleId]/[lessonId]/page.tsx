import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import LessonViewerClient from "../../UnitViewer";

export default async function LessonPage({ 
  params 
}: { 
  params: { moduleId: string, lessonId: string } 
}) {
  const session = await auth();
  if (!session?.user) redirect("/auth/login");

  const { moduleId, lessonId } = params;

  // Fetch current lesson with resources
  const lesson = await prisma.lesson.findUnique({
    where: { id: lessonId },
    include: {
      resources: true,
      progress: {
        where: { userId: session.user.id }
      },
      module: true
    }
  });

  if (!lesson || lesson.moduleId !== moduleId) redirect("/academie");

  // Fetch all modules for sidebar navigation
  const allModules = await prisma.module.findMany({
    where: { course: { published: true } },
    include: {
      lessons: {
        orderBy: { order: 'asc' },
        include: {
          progress: {
            where: { userId: session.user.id }
          }
        }
      }
    },
    orderBy: { order: 'asc' }
  });

  // Transform data for the client component
  const formattedCurrentLesson = {
    id: lesson.id,
    title: lesson.title,
    duration: lesson.duration || "00:00",
    videoUrl: lesson.videoUrl || "",
    content: lesson.content || "",
    completed: lesson.progress.length > 0 && lesson.progress[0].completed,
    resources: lesson.resources.map(r => ({
      id: r.id,
      type: r.type,
      label: r.label,
      url: r.url || "",
      content: r.content || ""
    }))
  };

  const formattedCurrentModule = {
    id: lesson.module.id,
    title: lesson.module.title,
    description: lesson.module.description || "",
    outcome: lesson.module.outcome || "",
    finalActionTitle: lesson.module.finalActionTitle || "",
    finalActionDesc: lesson.module.finalActionDesc || "",
    lessons: [] // not needed for this prop
  };

  const formattedAllModules = allModules.map(m => ({
    id: m.id,
    title: m.title,
    lessons: m.lessons.map(l => ({
      id: l.id,
      title: l.title,
      duration: l.duration || "00:00",
      completed: l.progress.length > 0 && l.progress[0].completed,
      resources: []
    }))
  }));

  return (
    <LessonViewerClient 
      currentLesson={formattedCurrentLesson}
      currentModule={formattedCurrentModule}
      allModules={formattedAllModules as any}
    />
  );
}

