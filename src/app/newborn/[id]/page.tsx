import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ArrowLeft, Baby, Edit } from "lucide-react";
import NewbornChartTabs from "@/components/NewbornChartTabs";
import { notFound } from "next/navigation";

export default async function NewbornChartPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const newborn = await prisma.newbornRecord.findUnique({
    where: { id },
    include: {
      maternalPatient: {
          select: { id: true, firstName: true, lastName: true, admissionNumber: true }
      },
      vitalSigns: { orderBy: { createdAt: "desc" } },
      medications: { orderBy: { createdAt: "desc" } },
      nurseNotes: { orderBy: { createdAt: "desc" } },
      outputCharts: { orderBy: { createdAt: "desc" } },
      physicianOrders: { orderBy: { createdAt: "desc" } },
      apgarScores: { orderBy: { createdAt: "asc" } },
    }
  });

  if (!newborn) return notFound();

  const serialized = JSON.parse(JSON.stringify(newborn));

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-20">
      <div className="flex items-center gap-4 glass-card p-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-2 h-full bg-blue-500"></div>
        <Link href="/newborn" className="p-2 hover:bg-slate-100 rounded-full transition-colors flex-shrink-0 ml-2">
          <ArrowLeft size={24} className="text-slate-600" />
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-3">
             <div className="p-2.5 rounded-full bg-blue-100/50 text-blue-700 backdrop-blur-sm"><Baby size={28} /></div>
             <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
              {newborn.name}
            </h1>
            <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-white/40 border border-white/50 text-slate-700 font-mono shadow-sm">
              ICD: {newborn.icdCode || "Z38.0"}
            </span>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 mt-3 text-sm text-slate-500">
            <p><span className="font-medium text-slate-700">Mother:</span>{" "}
              <Link href={`/maternal/${newborn.maternalPatient.id}`} className="text-blue-600 hover:underline">
                 {newborn.maternalPatient.lastName}, {newborn.maternalPatient.firstName} ({newborn.maternalPatient.admissionNumber})
              </Link>
            </p>
            <p><span className="font-medium text-slate-700">Gender:</span> {newborn.gender}</p>
            <p><span className="font-medium text-slate-700">DOB:</span> {new Date(newborn.dateOfBirth).toLocaleDateString()} @ {newborn.timeOfBirth}</p>
            <p><span className="font-medium text-slate-700">Delivery:</span> {newborn.mannerOfDelivery}</p>
          </div>
        </div>
        <Link href={`/newborn/${id}/edit`} className="glass-button-primary px-4 py-2.5 rounded-xl font-semibold transition-all flex items-center gap-2 shadow-md text-sm">
          <Edit size={16} /> Edit Record
        </Link>
      </div>

      <NewbornChartTabs newborn={serialized} />
    </div>
  );
}
