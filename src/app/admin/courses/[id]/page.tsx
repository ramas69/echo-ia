import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import ManageCourseClient from "../ManageCourseClient";

export default async function AdminManageCoursePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  // Si c'est un nouveau cours, on passe un objet vide
  if (id === 'new') {
    return (
      <ManageCourseClient 
        course={{ 
          id: 'new', 
          title: 'Nouvelle Formation', 
          modules: [] 
        }} 
      />
    );
  }

  const course = await prisma.course.findUnique({
    where: { id },
    include: {
      modules: {
        orderBy: { order: 'asc' },
        include: {
          lessons: {
            orderBy: { order: 'asc' },
            include: {
              resources: true
            }
          }
        }
      }
    }
  });

  if (!course) notFound();

  return <ManageCourseClient course={course} />;
}

