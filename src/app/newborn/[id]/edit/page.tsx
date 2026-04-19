import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import { updateNewbornRecord } from "@/app/actions/newborn";

export default async function EditNewbornRecord({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const newborn = await prisma.newbornRecord.findUnique({ 
    where: { id },
    include: { maternalPatient: true }
  });
  
  if (!newborn) return notFound();

  const fmt = (d: Date | null | undefined) => d ? new Date(d).toISOString().split("T")[0] : "";

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20">
      <div className="flex items-center gap-4">
        <Link href={`/newborn/${id}`} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
          <ArrowLeft size={20} className="text-slate-600" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Edit Newborn Record</h1>
          <p className="text-slate-500 mt-1">{newborn.name} — Mother: {newborn.maternalPatient.lastName}</p>
        </div>
      </div>

      <form action={updateNewbornRecord} className="space-y-8">
        <input type="hidden" name="id" value={id} />

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-lg font-bold text-blue-900 border-b border-slate-100 pb-3 mb-6 uppercase tracking-wider">A. Newborn Identification</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-full">
              <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
              <input required type="text" name="name" defaultValue={newborn.name} className="w-full p-2.5 rounded-lg border border-slate-300" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Gender</label>
              <select name="gender" defaultValue={newborn.gender} className="w-full p-2.5 rounded-lg border border-slate-300 bg-white">
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">ICD Code</label>
              <input type="text" name="icdCode" defaultValue={newborn.icdCode || "Z38.0"} className="w-full p-2.5 rounded-lg border border-slate-300" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Date of Birth</label>
              <input required type="date" name="dateOfBirth" defaultValue={fmt(newborn.dateOfBirth)} className="w-full p-2.5 rounded-lg border border-slate-300" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Time of Birth</label>
              <input required type="time" name="timeOfBirth" defaultValue={newborn.timeOfBirth || ""} className="w-full p-2.5 rounded-lg border border-slate-300" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Manner of Delivery</label>
              <input required type="text" name="mannerOfDelivery" defaultValue={newborn.mannerOfDelivery || ""} className="w-full p-2.5 rounded-lg border border-slate-300" placeholder="e.g. NSD" />
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-lg font-bold text-blue-900 border-b border-slate-100 pb-3 mb-6 uppercase tracking-wider">B. Physical Measurements</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Weight (kg)</label>
              <input type="number" step="0.01" name="weight" defaultValue={newborn.weight ?? undefined} className="w-full p-2.5 rounded-lg border border-slate-300" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Length (cm)</label>
              <input type="number" step="0.1" name="length" defaultValue={newborn.length ?? undefined} className="w-full p-2.5 rounded-lg border border-slate-300" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Head (cm)</label>
              <input type="number" step="0.1" name="headCircumference" defaultValue={newborn.headCircumference ?? undefined} className="w-full p-2.5 rounded-lg border border-slate-300" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Chest (cm)</label>
              <input type="number" step="0.1" name="chestCircumference" defaultValue={newborn.chestCircumference ?? undefined} className="w-full p-2.5 rounded-lg border border-slate-300" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Abdominal (cm)</label>
              <input type="number" step="0.1" name="abdominalCircumference" defaultValue={newborn.abdominalCircumference ?? undefined} className="w-full p-2.5 rounded-lg border border-slate-300" />
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-lg font-bold text-blue-900 border-b border-slate-100 pb-3 mb-6 uppercase tracking-wider">C. Clinical Diagnosis</h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Admission Diagnosis</label>
              <textarea required name="admissionDiagnosis" rows={3} defaultValue={newborn.admissionDiagnosis || ""} className="w-full p-2.5 rounded-lg border border-slate-300" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Final Diagnosis</label>
              <textarea name="finalDiagnosis" rows={3} defaultValue={newborn.finalDiagnosis || ""} className="w-full p-2.5 rounded-lg border border-slate-300" />
            </div>
          </div>
        </div>

        <div className="sticky bottom-6 bg-white p-4 rounded-2xl shadow-xl border border-slate-200 flex justify-between items-center">
          <div className="flex gap-4 w-full md:w-auto ml-auto">
            <Link href={`/newborn/${id}`} className="px-6 py-2.5 rounded-xl text-slate-700 hover:bg-slate-100 font-medium transition-colors w-full md:w-auto text-center">
              Cancel
            </Link>
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2.5 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 shadow-md">
              <Save size={18} />
              Save Changes
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
