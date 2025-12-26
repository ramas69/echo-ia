import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import UnitEditor from "./UnitEditor";

export default async function AdminUnitEditPage({ 
  params 
}: { 
  params: Promise<{ unitId: string }> 
}) {
  const { unitId } = await params;
  const session = await auth();

  // @ts-ignore
  if (!session || session.user?.role !== "ADMIN") {
    redirect("/");
  }

  const unit = await prisma.unit.findUnique({
    where: { id: unitId },
    include: {
      resources: true,
      phase: true,
    }
  });

  if (!unit) notFound();

  return (
    <div className="p-10 space-y-10">
      <UnitEditor initialUnit={unit as any} />
    </div>
  );
}

