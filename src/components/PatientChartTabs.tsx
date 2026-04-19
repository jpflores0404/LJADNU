"use client";

import { useState } from "react";
import DynamicVitalsTable from "./DynamicVitalsTable";
import DynamicMedicationTable from "./DynamicMedicationTable";
import DynamicNurseNotes from "./DynamicNurseNotes";
import DynamicOutputChart from "./DynamicOutputChart";
import DynamicPhysicianOrdersTable from "./DynamicPhysicianOrdersTable";
import DynamicUltrasoundTable from "./DynamicUltrasoundTable";
import DynamicLabTable from "./DynamicLabTable";
import BloodTypingForm from "./BloodTypingForm";
import PostpartumMonitoringForm from "./PostpartumMonitoringForm";
import { Plus } from "lucide-react";
import Link from "next/link";

interface PatientChartTabsProps {
  patient: any;
}

const TABS = ["Demographics", "Orders", "Vital Signs", "Medications", "Nurse Notes", "Output", "Labs", "Blood Type", "Ultrasound", "Postpartum", "Newborns"];

export default function PatientChartTabs({ patient }: PatientChartTabsProps) {
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
                <h3 className="font-bold text-slate-800 mb-4 uppercase tracking-wider text-sm border-b pb-2">Personal Info</h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex justify-between"><span className="text-slate-500">Full Name</span> <span className="font-medium">{patient.lastName}, {patient.firstName} {patient.middleName || ""}</span></li>
                  <li className="flex justify-between"><span className="text-slate-500">Date of Birth</span> <span className="font-medium">{new Date(patient.dateOfBirth).toLocaleDateString()}</span></li>
                  <li className="flex justify-between"><span className="text-slate-500">Age</span> <span className="font-medium">{patient.age} years</span></li>
                  <li className="flex justify-between"><span className="text-slate-500">Gender</span> <span className="font-medium">{patient.gender}</span></li>
                  <li className="flex justify-between"><span className="text-slate-500">Civil Status</span> <span className="font-medium">{patient.civilStatus}</span></li>
                  <li className="flex justify-between"><span className="text-slate-500">Religion</span> <span className="font-medium">{patient.religion || "—"}</span></li>
                  <li className="flex justify-between"><span className="text-slate-500">Nationality</span> <span className="font-medium">{patient.nationality || "—"}</span></li>
                  <li className="flex flex-col gap-1"><span className="text-slate-500">Address</span> <span className="font-medium text-right ml-auto max-w-xs">{patient.address}</span></li>
                  
                  <li className="flex justify-between mt-2 pt-2 border-t"><span className="text-slate-500">Occupation</span> <span className="font-medium">{patient.occupation || "—"}</span></li>
                  <li className="flex justify-between"><span className="text-slate-500">Employer</span> <span className="font-medium">{patient.employer || "—"}</span></li>
                  <li className="flex justify-between"><span className="text-slate-500">PhilHealth No.</span> <span className="font-medium">{patient.philhealthNumber || "—"} ({patient.philhealthStatus || "Member"})</span></li>
                </ul>

                <h3 className="font-bold text-slate-800 mt-8 mb-4 uppercase tracking-wider text-sm border-b pb-2">Family & Emergency Contacts</h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex flex-col"><span className="text-slate-500">Husband/Partner</span> <span className="font-medium">{patient.husbandName || "—"} ({patient.contactNumber})</span>
                     {patient.husbandOccupation && <span className="text-xs text-slate-400">Occ: {patient.husbandOccupation} | Emp: {patient.husbandEmployer || "—"}</span>}
                  </li>
                  <li className="flex justify-between border-t border-slate-100 pt-2"><span className="text-slate-500">Father</span> <span className="font-medium">{patient.fatherName || "—"}</span></li>
                  <li className="flex justify-between"><span className="text-slate-500">Mother</span> <span className="font-medium">{patient.motherName || "—"}</span></li>
                  <li className="flex flex-col border-t border-slate-100 pt-2"><span className="text-slate-500">Emergency Contact</span> <span className="font-medium">{patient.companionName || "—"} {patient.companionRelation ? `(${patient.companionRelation})` : ""}</span>
                     <span className="text-xs text-slate-500 mt-0.5">{patient.companionContact || "—"} | {patient.companionAddress || "—"}</span>
                  </li>
                </ul>
             </div>
             
             <div>
                <h3 className="font-bold text-slate-800 mb-4 uppercase tracking-wider text-sm border-b border-slate-200/50 pb-2">Clinical Data</h3>
                <ul className="space-y-3 text-sm flex flex-col items-stretch">
                  <li className="flex justify-between"><span className="text-slate-500">Bed Number</span> <span className="font-medium font-mono bg-white/50 text-blue-800 px-2 rounded border border-white/60 backdrop-blur-sm shadow-sm">{patient.bedNumber || "—"}</span></li>
                  <li className="flex flex-col gap-1 mt-2"><span className="text-slate-500">Admitting Diagnosis</span> <span className="font-medium bg-white/40 p-2 rounded border border-white/60 shadow-sm backdrop-blur-sm">{patient.admittingDiagnosis || "—"}</span></li>
                  <li className="flex flex-col gap-1 mt-2"><span className="text-slate-500">Final Diagnosis</span> <span className="font-medium bg-white/40 p-2 rounded border border-white/60 shadow-sm backdrop-blur-sm">{patient.finalDiagnosis || "Pending"}</span></li>
                  
                  <li className="flex justify-between mt-3 hidden"><span className="text-slate-500 text-xs">OB History (GTPAL)</span> <span className="font-medium font-mono text-xs bg-slate-100 px-2 py-0.5 rounded">G{patient.gravida} T{patient.term} P{patient.preterm} A{patient.abortion} L{patient.living}</span></li>
                  
                  <li className="flex justify-between items-center"><span className="text-slate-500">LMP</span> <span className="font-medium">{patient.lmp ? new Date(patient.lmp).toLocaleDateString() : "—"}</span></li>
                  <li className="flex justify-between items-center"><span className="text-slate-500">EDC</span> <span className="font-medium">{patient.edc ? new Date(patient.edc).toLocaleDateString() : "—"}</span></li>
                  <li className="flex justify-between items-center"><span className="text-slate-500">AOG</span> <span className="font-medium">{patient.aog || "—"}</span></li>
                  <li className="flex justify-between items-center"><span className="text-slate-500">BOW (+/-)</span> <span className="font-medium">{patient.bow || "—"}</span></li>
                  <li className="flex justify-between items-center"><span className="text-slate-500">Allergy</span> <span className="font-medium">{patient.allergy || "None"}</span></li>
                  <li className="flex justify-between items-center"><span className="text-slate-500">Pre-existing Illness</span> <span className="font-medium">{patient.preExistingIllness || "None"}</span></li>
                  
                  <li className="flex justify-between border-t border-slate-100 mt-3 pt-3"><span className="text-slate-500">Date Admitted</span> <span className="font-medium">{new Date(patient.dateAdmitted).toLocaleDateString()} {patient.timeAdmitted || ""}</span></li>
                  <li className="flex justify-between"><span className="text-slate-500">Admitted By</span> <span className="font-medium">{patient.admittedBy || "—"}</span></li>
                  {patient.dateDischarged && (
                    <>
                      <li className="flex justify-between text-green-700 bg-green-50 px-2 py-1 -mx-2 rounded"><span className="text-green-600">Date Discharged</span> <span className="font-medium">{new Date(patient.dateDischarged).toLocaleDateString()} {patient.timeDischarged || ""}</span></li>
                      <li className="flex justify-between "><span className="text-slate-500">Discharged By</span> <span className="font-medium">{patient.dischargedBy || "—"}</span></li>
                    </>
                  )}
                </ul>

                <h3 className="font-bold text-slate-800 mt-8 mb-4 uppercase tracking-wider text-sm border-b pb-2">Physical Exam Baseline</h3>
                <div className="grid grid-cols-2 gap-y-2 text-sm">
                  <div className="flex flex-col"><span className="text-slate-400 text-xs">IE (Gen. App.)</span><span className="font-medium">{patient.generalAppearance || "—"}</span></div>
                  <div className="flex flex-col"><span className="text-slate-400 text-xs">Temp/BP</span><span className="font-medium">{patient.temperature || "—"} | {patient.bloodPressure || "—"}</span></div>
                  <div className="flex flex-col"><span className="text-slate-400 text-xs">Edema</span><span className="font-medium">{patient.edema || "—"}</span></div>
                  <div className="flex flex-col"><span className="text-slate-400 text-xs">RR/PR</span><span className="font-medium">{patient.respiratoryRate || "—"} | {patient.pulseRate || "—"}</span></div>
                  <div className="flex flex-col"><span className="text-slate-400 text-xs">Pallor/Pale</span><span className="font-medium">{patient.pallor || "—"} / {patient.pale || "—"}</span></div>
                  <div className="flex flex-col"><span className="text-slate-400 text-xs">FH/FHT</span><span className="font-medium">{patient.fundalHeight || "—"} | {patient.fetalHeartTone || "—"}</span></div>
                  <div className="flex flex-col"><span className="text-slate-400 text-xs">Sunken Eye</span><span className="font-medium">{patient.sunkenEye || "—"}</span></div>
                </div>
             </div>
          </div>
        )}

        {activeTab === "Orders" && (
          <DynamicPhysicianOrdersTable patientId={patient.id} initialOrders={patient.physicianOrders} />
        )}

        {activeTab === "Vital Signs" && <DynamicVitalsTable patientId={patient.id} initialVitals={patient.vitalSigns} />}
        {activeTab === "Medications" && <DynamicMedicationTable patientId={patient.id} initialMeds={patient.medications} />}
        {activeTab === "Nurse Notes" && <DynamicNurseNotes patientId={patient.id} initialNotes={patient.nurseNotes} />}
        {activeTab === "Output" && <DynamicOutputChart patientId={patient.id} initialOutput={patient.outputCharts || []} />}
        
        {activeTab === "Labs" && (
           <DynamicLabTable patientId={patient.id} initialLabs={patient.labResults || []} />
        )}

        {activeTab === "Blood Type" && (
           <BloodTypingForm patient={patient} />
        )}
        
        {activeTab === "Ultrasound" && (
           <DynamicUltrasoundTable patientId={patient.id} initialUltrasounds={patient.ultrasoundResults || []} />
        )}

        {activeTab === "Postpartum" && (
           <PostpartumMonitoringForm
             patientId={patient.id}
             patientName={`${patient.lastName}, ${patient.firstName} ${patient.middleName || ""}`}
             initialRecords={patient.postpartumRecords || []}
           />
        )}

        {activeTab === "Newborns" && (
           <div className="space-y-6">
             <div className="flex justify-between items-center bg-slate-50 p-4 rounded-xl border border-slate-200">
               <div>
                 <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider">Linked Newborns</h3>
                 <p className="text-xs text-slate-500 mt-1">Manage babies born to this mother.</p>
               </div>
               <Link href={`/newborn/new?motherId=${patient.id}`} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors">
                 <Plus size={16} /> Register Baby
               </Link>
             </div>
             
             <div>
              {(!patient.newborns || patient.newborns.length === 0) ? (
                <div className="text-center py-12 text-slate-500 bg-slate-50 rounded-xl border border-dashed border-slate-300">
                  No newborn records linked to this mother yet.
                </div>
              ) : (
                <div className="space-y-4">
                  {patient.newborns.map((nb: any) => (
                    <Link key={nb.id} href={`/newborn/${nb.id}`} className="block p-4 border border-slate-200 rounded-xl shadow-sm hover:shadow-md hover:border-blue-300 transition-all">
                       <div className="flex justify-between items-center">
                         <div className="font-bold text-blue-900">{nb.name}</div>
                         <div className="text-sm font-medium bg-blue-100 text-blue-800 px-3 py-1 rounded-full">{nb.gender}</div>
                       </div>
                       <div className="mt-2 text-sm text-slate-600 flex gap-4">
                         <span>DOB: {new Date(nb.dateOfBirth).toLocaleDateString()} at {nb.timeOfBirth}</span>
                         <span>Weight: {nb.weight} kg</span>
                         <span>Delivery: {nb.mannerOfDelivery}</span>
                       </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
           </div>
        )}
      </div>
    </div>
  );
}
