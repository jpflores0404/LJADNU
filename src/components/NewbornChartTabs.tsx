"use client";

import { useState } from "react";
import DynamicVitalsTable from "./DynamicVitalsTable";
import DynamicMedicationTable from "./DynamicMedicationTable";
import DynamicNurseNotes from "./DynamicNurseNotes";
import DynamicOutputChart from "./DynamicOutputChart";
import DynamicPhysicianOrdersTable from "./DynamicPhysicianOrdersTable";
import ApgarCalculator from "./ApgarCalculator";

interface NewbornChartTabsProps {
  newborn: any;
}

const TABS = ["Demographics", "APGAR", "Orders", "Vital Signs", "Medications", "Nurse Notes", "Output"];

export default function NewbornChartTabs({ newborn }: NewbornChartTabsProps) {
  const [activeTab, setActiveTab] = useState("Demographics");

  return (
    <div className="glass-card overflow-hidden min-h-[600px]">
      <div className="flex overflow-x-auto glass-header">
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-4 text-sm font-semibold whitespace-nowrap transition-colors relative ${
              activeTab === tab 
                ? "text-blue-800 bg-white/60 shadow-[inset_0_-2px_0_0_#2563eb]" 
                : "text-slate-500 hover:text-slate-800 hover:bg-white/30"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="p-6">
        {activeTab === "Demographics" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div>
                <h3 className="font-bold text-slate-800 uppercase tracking-wider text-sm border-b pb-2 mb-4">Physical Examination</h3>
                <ul className="space-y-3 text-sm">
                   <li className="flex justify-between"><span className="text-slate-500">Weight</span> <span className="font-mono font-bold text-slate-900">{newborn.weight} kg</span></li>
                   <li className="flex justify-between"><span className="text-slate-500">Length</span> <span className="font-mono font-bold text-slate-900">{newborn.length} cm</span></li>
                   <li className="flex justify-between"><span className="text-slate-500">Head Circ.</span> <span className="font-mono font-bold">{newborn.headCircumference} cm</span></li>
                   <li className="flex justify-between"><span className="text-slate-500">Chest Circ.</span> <span className="font-mono font-bold">{newborn.chestCircumference} cm</span></li>
                   <li className="flex justify-between"><span className="text-slate-500">Abdominal Circ.</span> <span className="font-mono font-bold">{newborn.abdominalCircumference} cm</span></li>
                </ul>

                <h3 className="font-bold text-slate-800 uppercase tracking-wider text-sm border-b pb-2 mt-8 mb-4">Laboratory Procedures</h3>
                <div className="space-y-3 text-sm">
                   <div className="flex justify-between items-center glass-input p-3 rounded-xl border border-white/50">
                      <span className="text-slate-900 font-medium">Expanded Newborn Screening</span> 
                      <span className="text-slate-500 font-mono text-xs">April 16, 2026</span>
                   </div>
                   <div className="flex justify-between items-center glass-input p-3 rounded-xl border border-white/50">
                      <span className="text-slate-900 font-medium">Newborn Hearing Test</span> 
                      <span className="text-slate-500 font-mono text-xs">April 16, 2026</span>
                   </div>
                </div>
             </div>

             <div>
                <h3 className="font-bold text-slate-800 uppercase tracking-wider text-sm border-b pb-2 mb-4">Clinical Diagnosis</h3>
                <div className="space-y-4 text-sm">
                   <div>
                       <span className="text-slate-500 block text-xs uppercase font-bold mb-1">Admission Diagnosis</span>
                       <p className="text-slate-900 font-medium glass-input p-2.5 rounded-lg border border-white/50">{newborn.admissionDiagnosis || "—"}</p>
                   </div>
                   <div>
                       <span className="text-slate-500 block text-xs uppercase font-bold mb-1">Final Diagnosis</span>
                       <p className="text-slate-900 font-medium glass-input p-2.5 rounded-lg border border-white/50">{newborn.finalDiagnosis || "Pending"}</p>
                   </div>
                </div>
             </div>
          </div>
        )}

        {activeTab === "APGAR" && (
           <div className="max-w-2xl">
               <ApgarCalculator newbornId={newborn.id} initialScores={newborn.apgarScores} />
           </div>
        )}

        {activeTab === "Orders" && (
           <DynamicPhysicianOrdersTable patientId={newborn.id} initialOrders={newborn.physicianOrders} isNewborn={true} />
        )}

        {activeTab === "Vital Signs" && <DynamicVitalsTable patientId={newborn.id} initialVitals={newborn.vitalSigns} isNewborn={true} />}
        {activeTab === "Medications" && <DynamicMedicationTable patientId={newborn.id} initialMeds={newborn.medications} isNewborn={true} />}
        {activeTab === "Nurse Notes" && <DynamicNurseNotes patientId={newborn.id} initialNotes={newborn.nurseNotes} isNewborn={true} />}
        {activeTab === "Output" && <DynamicOutputChart patientId={newborn.id} initialOutput={newborn.outputCharts || []} isNewborn={true} />}
      </div>
    </div>
  );
}
