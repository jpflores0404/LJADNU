import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import { createNewbornRecord } from "@/app/actions/newborn";

export default async function NewNewbornRecord({ searchParams }: { searchParams: Promise<{ motherId?: string }> }) {
  const { motherId } = await searchParams;
  if (!motherId) return redirect("/maternal");

  const mother = await prisma.maternalPatient.findUnique({ where: { id: motherId } });
  if (!mother) return notFound();

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20">
      <div className="flex items-center gap-4">
        <Link href={`/maternal/${motherId}`} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
          <ArrowLeft size={20} className="text-slate-600" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Newborn Registration</h1>
          <p className="text-slate-500 mt-1">Register baby for Mother: {mother.lastName}, {mother.firstName}</p>
        </div>
      </div>

      <form action={createNewbornRecord} className="space-y-8">
        <input type="hidden" name="maternalPatientId" value={motherId} />

        <div className="glass-card p-8">
          <h2 className="text-lg font-bold text-blue-900 border-b border-slate-100 pb-3 mb-6 uppercase tracking-wider">A. Baby Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-full">
              <label className="block text-sm font-medium text-slate-700 mb-1">Full Name (or Baby Boy/Girl [Surname])</label>
              <input required type="text" name="name" className="w-full p-2.5 rounded-lg glass-input text-slate-900 shadow-sm transition-all focus:ring-2 focus:ring-blue-400/50 outline-none" placeholder="e.g. Baby Boy Dela Cruz" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Gender</label>
              <select name="gender" className="w-full p-2.5 rounded-lg border border-slate-300 bg-white">
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">ICD Code</label>
              <input type="text" name="icdCode" defaultValue="Z38.0" className="w-full p-2.5 rounded-lg glass-input text-slate-900 shadow-sm transition-all focus:ring-2 focus:ring-blue-400/50 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Date of Birth</label>
              <input required type="date" name="dateOfBirth" defaultValue={new Date().toISOString().split('T')[0]} className="w-full p-2.5 rounded-lg glass-input text-slate-900 shadow-sm transition-all focus:ring-2 focus:ring-blue-400/50 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Time of Birth</label>
              <input required type="time" name="timeOfBirth" className="w-full p-2.5 rounded-lg glass-input text-slate-900 shadow-sm transition-all focus:ring-2 focus:ring-blue-400/50 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Manner of Delivery</label>
              <input required type="text" name="mannerOfDelivery" className="w-full p-2.5 rounded-lg glass-input text-slate-900 shadow-sm transition-all focus:ring-2 focus:ring-blue-400/50 outline-none" placeholder="NSD / CS" />
            </div>
          </div>
        </div>

        <div className="glass-card p-8">
          <h2 className="text-lg font-bold text-blue-900 border-b border-slate-100 pb-3 mb-6 uppercase tracking-wider">B. Initial Measurements</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Weight (kg)</label>
              <input type="number" step="0.01" name="weight" className="w-full p-2.5 rounded-lg glass-input text-slate-900 shadow-sm transition-all focus:ring-2 focus:ring-blue-400/50 outline-none" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Length (cm)</label>
              <input type="number" step="0.1" name="length" className="w-full p-2.5 rounded-lg glass-input text-slate-900 shadow-sm transition-all focus:ring-2 focus:ring-blue-400/50 outline-none" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Head (cm)</label>
              <input type="number" step="0.1" name="headCircumference" className="w-full p-2.5 rounded-lg glass-input text-slate-900 shadow-sm transition-all focus:ring-2 focus:ring-blue-400/50 outline-none" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Chest (cm)</label>
              <input type="number" step="0.1" name="chestCircumference" className="w-full p-2.5 rounded-lg glass-input text-slate-900 shadow-sm transition-all focus:ring-2 focus:ring-blue-400/50 outline-none" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Abdominal (cm)</label>
              <input type="number" step="0.1" name="abdominalCircumference" className="w-full p-2.5 rounded-lg glass-input text-slate-900 shadow-sm transition-all focus:ring-2 focus:ring-blue-400/50 outline-none" />
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-lg font-bold text-blue-900 border-b border-slate-100 pb-3 mb-6 uppercase tracking-wider">C. Diagnosis</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Initial Diagnosis</label>
              <textarea required name="admissionDiagnosis" rows={3} className="w-full p-2.5 rounded-lg glass-input text-slate-900 shadow-sm transition-all focus:ring-2 focus:ring-blue-400/50 outline-none" placeholder="Describe the newborn's immediate condition..." />
            </div>
          </div>
        </div>

        <div className="sticky bottom-6 glass-panel p-4 flex justify-end gap-4 z-50">
          <Link href={`/maternal/${motherId}`} className="px-6 py-2.5 rounded-xl bg-white/40 text-slate-800 hover:bg-white/70 font-semibold border border-white/60 backdrop-blur-sm transition-all shadow-sm">
            Cancel
          </Link>
          <button type="submit" className="glass-button-primary px-8 py-2.5 rounded-xl font-semibold transition-all flex items-center gap-2 shadow-md">
            <Save size={18} />
            Complete Registration
          </button>
        </div>
      </form>
    </div>
  );
}

