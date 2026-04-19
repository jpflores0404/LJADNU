"use client";

import { useState } from "react";
import { Save, Edit, Check } from "lucide-react";
import { updateBloodTyping } from "@/app/actions/subrecords";

export default function BloodTypingForm({ patient }: { patient: any }) {
  const [isEditing, setIsEditing] = useState(false);
  const [antiA, setAntiA] = useState(patient.antiA || "");
  const [antiB, setAntiB] = useState(patient.antiB || "");
  const [antiD, setAntiD] = useState(patient.antiD || "");
  const [bloodTypeABO, setBloodTypeABO] = useState(patient.bloodTypeABO || "");
  const [bloodTypeRh, setBloodTypeRh] = useState(patient.bloodTypeRh || "");
  const [saved, setSaved] = useState(false);

  async function handleSave(formData: FormData) {
    await updateBloodTyping(patient.id, formData);
    setIsEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  // Derive blood type display from anti results
  const bloodTypeDisplay = bloodTypeABO && bloodTypeRh
    ? `${bloodTypeABO} ${bloodTypeRh.toUpperCase() === "POSITIVE" ? "POSITIVE" : "NEGATIVE"} (${bloodTypeABO}${bloodTypeRh.toUpperCase() === "POSITIVE" ? "+" : "-"})`
    : "—";

  const hasData = antiA || antiB || antiD || bloodTypeABO;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-slate-800 uppercase tracking-wider text-sm">
          Blood Typing and Cross Matching
        </h3>
        <div className="flex gap-2">
          {saved && (
            <span className="text-emerald-600 text-sm font-medium flex items-center gap-1 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
              <Check size={14} /> Saved
            </span>
          )}
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-50 text-blue-600 hover:bg-blue-100 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-1 border border-blue-200"
            >
              <Edit size={16} /> {hasData ? "Edit" : "Add Blood Type"}
            </button>
          )}
        </div>
      </div>

      {isEditing ? (
        <form action={handleSave} className="space-y-8">
          {/* ABO and Rh Blood Typing */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="bg-slate-50 px-6 py-3 border-b border-slate-200">
              <h4 className="font-bold text-slate-800 uppercase text-xs tracking-wider">ABO and Rh Blood Typing</h4>
            </div>
            <div className="p-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left p-3 font-bold text-slate-600 uppercase text-xs tracking-wider w-1/2">Test</th>
                    <th className="text-left p-3 font-bold text-slate-600 uppercase text-xs tracking-wider w-1/2">Result</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-100">
                    <td className="p-3 font-medium text-slate-700">Anti-A</td>
                    <td className="p-3">
                      <select name="antiA" value={antiA} onChange={e => setAntiA(e.target.value)} className="p-2 rounded-lg border border-slate-300 bg-white text-slate-900 text-sm w-48">
                        <option value="">Select...</option>
                        <option value="POSITIVE">POSITIVE</option>
                        <option value="NEGATIVE">NEGATIVE</option>
                      </select>
                    </td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="p-3 font-medium text-slate-700">Anti-B</td>
                    <td className="p-3">
                      <select name="antiB" value={antiB} onChange={e => setAntiB(e.target.value)} className="p-2 rounded-lg border border-slate-300 bg-white text-slate-900 text-sm w-48">
                        <option value="">Select...</option>
                        <option value="POSITIVE">POSITIVE</option>
                        <option value="NEGATIVE">NEGATIVE</option>
                      </select>
                    </td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="p-3 font-medium text-slate-700">Anti-D (Rh)</td>
                    <td className="p-3">
                      <select name="antiD" value={antiD} onChange={e => setAntiD(e.target.value)} className="p-2 rounded-lg border border-slate-300 bg-white text-slate-900 text-sm w-48">
                        <option value="">Select...</option>
                        <option value="POSITIVE">POSITIVE</option>
                        <option value="NEGATIVE">NEGATIVE</option>
                      </select>
                    </td>
                  </tr>
                </tbody>
              </table>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Blood Type (ABO)</label>
                  <select name="bloodTypeABO" value={bloodTypeABO} onChange={e => setBloodTypeABO(e.target.value)} className="p-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 text-sm w-full">
                    <option value="">Select...</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="AB">AB</option>
                    <option value="O">O</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Rh Factor</label>
                  <select name="bloodTypeRh" value={bloodTypeRh} onChange={e => setBloodTypeRh(e.target.value)} className="p-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 text-sm w-full">
                    <option value="">Select...</option>
                    <option value="POSITIVE">Positive (+)</option>
                    <option value="NEGATIVE">Negative (-)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <button type="button" onClick={() => setIsEditing(false)} className="px-5 py-2.5 bg-white text-slate-700 rounded-xl hover:bg-slate-50 border border-slate-300 text-sm font-bold">Cancel</button>
            <button type="submit" className="px-5 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 flex gap-2 items-center text-sm font-bold shadow-md"><Save size={16}/> Save Blood Type</button>
          </div>
        </form>
      ) : (
        /* READ-ONLY VIEW */
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="bg-slate-50 px-6 py-3 border-b border-slate-200">
            <h4 className="font-bold text-slate-800 uppercase text-xs tracking-wider">ABO and Rh Blood Typing</h4>
          </div>
          <div className="p-6">
            {!hasData ? (
              <div className="text-center py-8 text-slate-500 italic">
                No blood type recorded yet. Click &quot;Add Blood Type&quot; to enter results.
              </div>
            ) : (
              <>
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="text-left p-3 font-bold text-slate-600 uppercase text-xs tracking-wider w-1/2">Test</th>
                      <th className="text-left p-3 font-bold text-slate-600 uppercase text-xs tracking-wider w-1/2">Result</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-100">
                      <td className="p-3 font-medium text-slate-700">Anti-A</td>
                      <td className="p-3 font-bold text-slate-900">{antiA || "—"}</td>
                    </tr>
                    <tr className="border-b border-slate-100">
                      <td className="p-3 font-medium text-slate-700">Anti-B</td>
                      <td className="p-3 font-bold text-slate-900">{antiB || "—"}</td>
                    </tr>
                    <tr className="border-b border-slate-100">
                      <td className="p-3 font-medium text-slate-700">Anti-D (Rh)</td>
                      <td className="p-3 font-bold text-slate-900">{antiD || "—"}</td>
                    </tr>
                  </tbody>
                </table>

                <div className="mt-6 bg-slate-50 border border-slate-200 rounded-xl p-4">
                  <span className="text-sm text-slate-500">Blood Type:</span>
                  <span className="ml-2 text-lg font-black text-red-700">{bloodTypeDisplay}</span>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
