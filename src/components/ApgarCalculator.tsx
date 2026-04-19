"use client";

import { useState } from "react";
import { submitApgarScore } from "@/app/actions/subrecords";
import { Check } from "lucide-react";

const APGAR_CRITERIA = [
  { key: "heartRate", label: "Heart Rate", options: [{ label: "Absent", score: 0 }, { label: "<100", score: 1 }, { label: ">100", score: 2 }] },
  { key: "respiratoryEffort", label: "Respiratory Rate", options: [{ label: "Absent", score: 0 }, { label: "Slow irregular weak cry", score: 1 }, { label: "Good vigorous cry", score: 2 }] },
  { key: "muscleTone", label: "Muscle Tone", options: [{ label: "Flaccid, Limp", score: 0 }, { label: "Some flexion of extremities", score: 1 }, { label: "Good flexion, active motion", score: 2 }] },
  { key: "reflexIrritability", label: "Reflex Irritability", options: [{ label: "No Response", score: 0 }, { label: "Weak cry and grimace", score: 1 }, { label: "Vigorous cry, cough, sneeze", score: 2 }] },
  { key: "skinColor", label: "Skin Color", options: [{ label: "Blue", score: 0 }, { label: "Acrocyanosis", score: 1 }, { label: "Pink", score: 2 }] }
];

export default function ApgarCalculator({ newbornId, initialScores }: { newbornId: string, initialScores: any[] }) {
  const existing1Min = initialScores.find(s => s.minuteType === "1min");
  const existing5Min = initialScores.find(s => s.minuteType === "5min");

  return (
    <div className="space-y-6">
       <h3 className="font-bold text-slate-800 uppercase tracking-wider text-sm border-b pb-2">APGAR Score Sheet</h3>
       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ApgarForm newbornId={newbornId} minuteType="1min" existingScore={existing1Min} title="1 Minute Score" />
          <ApgarForm newbornId={newbornId} minuteType="5min" existingScore={existing5Min} title="5 Minutes Score" />
       </div>
    </div>
  );
}

function ApgarForm({ newbornId, minuteType, existingScore, title }: { newbornId: string, minuteType: string, existingScore: any, title: string }) {
   if (existingScore) {
       return (
           <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 bg-emerald-500 text-white px-4 py-1 rounded-bl-xl text-xs font-bold flex items-center gap-1">
                   <Check size={14} /> Completed
               </div>
               <h4 className="font-bold text-blue-900 mb-4">{title}</h4>
               
               <div className="space-y-2 text-sm text-slate-700">
                   {APGAR_CRITERIA.map(c => (
                       <div key={c.key} className="flex justify-between border-b border-slate-200 pb-1">
                           <span className="font-medium">{c.label}</span>
                           <span className="font-mono text-blue-600 font-bold">{existingScore[c.key]} points</span>
                       </div>
                   ))}
                   <div className="pt-4 flex justify-between items-center font-bold text-lg text-slate-900">
                       <span>Total Score:</span>
                       <span className="bg-blue-100 text-blue-800 px-4 py-1 rounded-lg">{existingScore.totalScore} / 10</span>
                   </div>
               </div>
           </div>
       );
   }

   return (
       <form action={async (fd) => { await submitApgarScore(newbornId, minuteType, fd); }} className="bg-white border text-sm border-blue-200 shadow-sm p-6 rounded-2xl">
           <h4 className="font-bold text-blue-900 border-b border-slate-100 pb-2 mb-4">{title} Planner</h4>
           
           <div className="space-y-4">
               {APGAR_CRITERIA.map(c => (
                   <div key={c.key}>
                       <label className="block text-xs font-bold text-slate-500 uppercase mb-2">{c.label}</label>
                       <div className="grid grid-cols-3 gap-2">
                           {c.options.map((opt) => (
                               <label key={opt.label} className="border border-slate-200 rounded-lg p-2 text-center cursor-pointer hover:bg-blue-50 hover:border-blue-300 transition-colors has-[:checked]:bg-blue-100 has-[:checked]:border-blue-500 has-[:checked]:text-blue-900 flex flex-col justify-center min-h-[60px]">
                                  <input required type="radio" name={c.key} value={opt.score} className="sr-only" />
                                  <span className="text-xs leading-tight mb-1">{opt.label}</span>
                                  <span className="font-mono font-bold text-slate-400 text-[10px]">{opt.score} pt</span>
                               </label>
                           ))}
                       </div>
                   </div>
               ))}
           </div>
           
           <input type="hidden" name="totalScore" value="0" />
           <button type="submit" className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-xl transition-all shadow-md">
               Save {title}
           </button>
       </form>
   );
}
