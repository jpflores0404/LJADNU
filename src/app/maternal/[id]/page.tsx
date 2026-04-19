import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ArrowLeft, Edit } from "lucide-react";
import PatientChartTabs from "@/components/PatientChartTabs";
import { notFound } from "next/navigation";

export default async function MaternalChartPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const patient = await prisma.maternalPatient.findUnique({
    where: { id },
    include: {
      vitalSigns: { orderBy: { createdAt: "desc" } },
      medications: { orderBy: { createdAt: "desc" } },
      nurseNotes: { orderBy: { createdAt: "desc" } },
      outputCharts: { orderBy: { createdAt: "desc" } },
      labResults: { orderBy: { createdAt: "desc" } },
      physicianOrders: { orderBy: { createdAt: "desc" } },
      newborns: { orderBy: { createdAt: "desc" } },
      ultrasoundResults: { orderBy: { createdAt: "desc" } },
      postpartumRecords: { orderBy: { createdAt: "desc" } },
    }
  });

  if (!patient) return notFound();

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-20">
      <div className="flex items-center gap-4 glass-card p-6">
        <Link href="/maternal" className="p-2 hover:bg-white/40 rounded-full transition-all flex-shrink-0 border border-transparent hover:border-white/60">
          <ArrowLeft size={24} className="text-slate-600" />
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-3">
             <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
              {patient.lastName}, {patient.firstName} {patient.middleName}
            </h1>
            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-sm border ${
              patient.status === 'Active' ? 'bg-emerald-100/50 text-emerald-800 border-emerald-300/50' : 'bg-slate-100/50 text-slate-700 border-slate-300/50'
            }`}>
              {patient.status}
            </span>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 mt-2 text-sm text-slate-500">
            <p><span className="font-medium text-slate-700">ADM #:</span> {patient.admissionNumber}</p>
            <p><span className="font-medium text-slate-700">Admitted:</span> {new Date(patient.dateAdmitted).toLocaleDateString()}</p>
            <p><span className="font-medium text-slate-700">Attending MD:</span> {patient.attendingPhysician || "Unassigned"}</p>
            <p><span className="font-medium text-slate-700">Age:</span> {patient.age} yrs</p>
          </div>
        </div>
        <Link href={`/maternal/${id}/edit`} className="bg-white/40 hover:bg-white/80 text-blue-700 px-4 py-2.5 rounded-xl font-semibold transition-all flex items-center gap-2 border border-white/60 text-sm shadow-sm">
          <Edit size={16} /> Edit Record
        </Link>
      </div>

      <PatientChartTabs patient={JSON.parse(JSON.stringify(patient))} />
    </div>
  );
}
