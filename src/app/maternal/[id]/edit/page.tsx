import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import { updateMaternalRecord } from "@/app/actions/maternal";

export default async function EditMaternalRecord({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const patient = await prisma.maternalPatient.findUnique({ where: { id } });
  if (!patient) return notFound();

  const fmt = (d: Date | null | undefined) => d ? new Date(d).toISOString().split("T")[0] : "";

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20">
      <div className="flex items-center gap-4">
        <Link href={`/maternal/${id}`} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
          <ArrowLeft size={20} className="text-slate-600" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Edit Patient Data Sheet</h1>
          <p className="text-slate-500 mt-1">{patient.lastName}, {patient.firstName} — ADM# {patient.admissionNumber}</p>
        </div>
      </div>

      <form action={updateMaternalRecord} className="space-y-8">
        <input type="hidden" name="id" value={id} />

        {/* SECTION A: Demographics */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-lg font-bold text-blue-900 border-b border-slate-100 pb-3 mb-6 uppercase tracking-wider">A. Patient Demographics</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="col-span-full md:col-span-1">
              <label className="block text-sm font-medium text-slate-700 mb-1">Bed Number</label>
              <input type="text" name="bedNumber" defaultValue={patient.bedNumber || ""} className="w-full p-2.5 rounded-lg border border-slate-300" />
            </div>
            
            <div className="col-span-full md:col-span-1">
              <label className="block text-sm font-medium text-slate-700 mb-1">Last Name</label>
              <input required type="text" name="lastName" defaultValue={patient.lastName} className="w-full p-2.5 rounded-lg border border-slate-300" />
            </div>
            <div className="col-span-full md:col-span-1">
              <label className="block text-sm font-medium text-slate-700 mb-1">First Name</label>
              <input required type="text" name="firstName" defaultValue={patient.firstName} className="w-full p-2.5 rounded-lg border border-slate-300" />
            </div>
            <div className="col-span-full md:col-span-1">
              <label className="block text-sm font-medium text-slate-700 mb-1">Middle Name</label>
              <input type="text" name="middleName" defaultValue={patient.middleName || ""} className="w-full p-2.5 rounded-lg border border-slate-300" />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Age</label>
              <input required type="number" name="age" defaultValue={patient.age} className="w-full p-2.5 rounded-lg border border-slate-300" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Gender</label>
              <input type="text" name="gender" defaultValue={patient.gender} className="w-full p-2.5 rounded-lg border border-slate-300" readOnly />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Civil Status</label>
              <select name="civilStatus" defaultValue={patient.civilStatus} className="w-full p-2.5 rounded-lg border border-slate-300 bg-white">
                <option value="Single">Single</option>
                <option value="Married">Married</option>
                <option value="Widowed">Widowed</option>
                <option value="Separated">Separated</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Religion</label>
              <input type="text" name="religion" defaultValue={patient.religion || ""} className="w-full p-2.5 rounded-lg border border-slate-300" />
            </div>

            <div className="col-span-full">
              <label className="block text-sm font-medium text-slate-700 mb-1">Complete Address</label>
              <input required type="text" name="address" defaultValue={patient.address} className="w-full p-2.5 rounded-lg border border-slate-300" />
            </div>

            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">Date of Birth</label>
              <input required type="date" name="dateOfBirth" defaultValue={fmt(patient.dateOfBirth)} className="w-full p-2.5 rounded-lg border border-slate-300" />
            </div>
            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">Place of Birth</label>
              <input type="text" name="placeOfBirth" defaultValue={patient.placeOfBirth || ""} className="w-full p-2.5 rounded-lg border border-slate-300" />
            </div>

            <div className="col-span-1 md:col-span-1">
              <label className="block text-sm font-medium text-slate-700 mb-1">Nationality</label>
              <input type="text" name="nationality" defaultValue={patient.nationality} className="w-full p-2.5 rounded-lg border border-slate-300" />
            </div>
            <div className="col-span-1 md:col-span-1">
              <label className="block text-sm font-medium text-slate-700 mb-1">Occupation</label>
              <input type="text" name="occupation" defaultValue={patient.occupation || ""} className="w-full p-2.5 rounded-lg border border-slate-300" />
            </div>
            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">Employer</label>
              <input type="text" name="employer" defaultValue={patient.employer || ""} className="w-full p-2.5 rounded-lg border border-slate-300" />
            </div>
            
            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">Date Admitted</label>
              <input type="date" name="dateAdmitted" defaultValue={fmt(patient.dateAdmitted)} className="w-full p-2.5 rounded-lg border border-slate-300" />
            </div>
            <div className="col-span-1 md:col-span-1">
              <label className="block text-sm font-medium text-slate-700 mb-1">Time Admitted</label>
              <input type="time" name="timeAdmitted" defaultValue={patient.timeAdmitted || ""} className="w-full p-2.5 rounded-lg border border-slate-300" />
            </div>
            <div className="col-span-1 md:col-span-1">
              <label className="block text-sm font-medium text-slate-700 mb-1">Admitted By</label>
              <input type="text" name="admittedBy" defaultValue={patient.admittedBy || ""} className="w-full p-2.5 rounded-lg border border-slate-300" />
            </div>
          </div>
        </div>

        {/* SECTION B: PhilHealth */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-lg font-bold text-blue-900 border-b border-slate-100 pb-3 mb-6 uppercase tracking-wider">B. PhilHealth Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">PhilHealth Number</label>
              <input type="text" name="philhealthNumber" defaultValue={patient.philhealthNumber || ""} className="w-full p-2.5 rounded-lg border border-slate-300" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Type</label>
              <select name="philhealthStatus" defaultValue={patient.philhealthStatus || "Member"} className="w-full p-2.5 rounded-lg border border-slate-300 bg-white">
                <option value="Member">Member</option>
                <option value="Dependent">Dependent</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Name of Member</label>
              <input type="text" name="philhealthMemberName" defaultValue={patient.philhealthMemberName || ""} className="w-full p-2.5 rounded-lg border border-slate-300" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Relation to Patient</label>
              <input type="text" name="philhealthMemberRelation" defaultValue={patient.philhealthMemberRelation || ""} className="w-full p-2.5 rounded-lg border border-slate-300" />
            </div>
            <div className="col-span-full">
              <label className="block text-sm font-medium text-slate-700 mb-1">Member Address</label>
              <input type="text" name="philhealthMemberAddress" defaultValue={patient.philhealthMemberAddress || ""} className="w-full p-2.5 rounded-lg border border-slate-300" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Contact Number</label>
              <input type="text" name="philhealthMemberContact" defaultValue={patient.philhealthMemberContact || ""} className="w-full p-2.5 rounded-lg border border-slate-300" />
            </div>
          </div>
        </div>

        {/* SECTION C: Family & Emergency Contact */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-lg font-bold text-blue-900 border-b border-slate-100 pb-3 mb-6 uppercase tracking-wider">C. Family & Emergency Contacts</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-full space-y-4">
              <h3 className="font-semibold text-slate-700">Husband / LIP</h3>
              <div className="grid grid-cols-2 gap-4">
                <input type="text" name="husbandName" defaultValue={patient.husbandName || ""} placeholder="Name" className="w-full p-2.5 rounded-lg border border-slate-300" />
                <input type="tel" name="contactNumber" defaultValue={patient.contactNumber} placeholder="Contact Number" className="w-full p-2.5 rounded-lg border border-slate-300" />
                <input type="text" name="husbandOccupation" defaultValue={patient.husbandOccupation || ""} placeholder="Occupation" className="w-full p-2.5 rounded-lg border border-slate-300" />
                <input type="text" name="husbandEmployer" defaultValue={patient.husbandEmployer || ""} placeholder="Employer" className="w-full p-2.5 rounded-lg border border-slate-300" />
              </div>
            </div>

            <div className="col-span-full space-y-4">
              <h3 className="font-semibold text-slate-700">Parents</h3>
              <div className="grid grid-cols-2 gap-4">
                <input type="text" name="fatherName" defaultValue={patient.fatherName || ""} placeholder="Father's Name" className="w-full p-2.5 rounded-lg border border-slate-300" />
                <input type="text" name="fatherAddress" defaultValue={patient.fatherAddress || ""} placeholder="Father's Address" className="w-full p-2.5 rounded-lg border border-slate-300" />
                <input type="text" name="motherName" defaultValue={patient.motherName || ""} placeholder="Mother's Name" className="w-full p-2.5 rounded-lg border border-slate-300" />
                <input type="text" name="motherAddress" defaultValue={patient.motherAddress || ""} placeholder="Mother's Address" className="w-full p-2.5 rounded-lg border border-slate-300" />
              </div>
            </div>

            <div className="col-span-full space-y-4">
              <h3 className="font-semibold text-slate-700">Person to be Notified in Case of Emergency</h3>
              <div className="grid grid-cols-2 gap-4">
                <input type="text" name="companionName" defaultValue={patient.companionName || ""} placeholder="Name" className="w-full p-2.5 rounded-lg border border-slate-300" />
                <input type="text" name="companionRelation" defaultValue={patient.companionRelation || ""} placeholder="Relation to Patient" className="w-full p-2.5 rounded-lg border border-slate-300" />
                <input type="text" name="companionAddress" defaultValue={patient.companionAddress || ""} placeholder="Address" className="w-full p-2.5 rounded-lg border border-slate-300" />
                <input type="tel" name="companionContact" defaultValue={patient.companionContact || ""} placeholder="Contact Number" className="w-full p-2.5 rounded-lg border border-slate-300" />
              </div>
            </div>
          </div>
        </div>

        {/* SECTION D: Physical Examination */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-lg font-bold text-blue-900 border-b border-slate-100 pb-3 mb-6 uppercase tracking-wider">D. Physical Examination (PE)</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div>
               <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">IE (Gen. App.)</label>
               <input type="text" name="generalAppearance" defaultValue={patient.generalAppearance || ""} placeholder="Awake, coherent" className="w-full p-2.5 rounded-lg border border-slate-300" />
            </div>
            <div>
               <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Edema</label>
               <input type="text" name="edema" defaultValue={patient.edema || ""} placeholder="None" className="w-full p-2.5 rounded-lg border border-slate-300" />
            </div>
            <div>
               <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Pallor</label>
               <input type="text" name="pallor" defaultValue={patient.pallor || ""} placeholder="Y/N" className="w-full p-2.5 rounded-lg border border-slate-300" />
            </div>
            <div>
               <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Pale</label>
               <input type="text" name="pale" defaultValue={patient.pale || ""} placeholder="Mild" className="w-full p-2.5 rounded-lg border border-slate-300" />
            </div>
            <div>
               <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Sunken Eye</label>
               <input type="text" name="sunkenEye" defaultValue={patient.sunkenEye || ""} placeholder="Y/N" className="w-full p-2.5 rounded-lg border border-slate-300" />
            </div>

            <div><label className="block text-xs mt-2 font-bold text-slate-500 mb-1">TEMP</label><input type="text" name="temperature" defaultValue={patient.temperature || ""} className="w-full p-2.5 rounded-lg border border-slate-300" /></div>
            <div><label className="block text-xs mt-2 font-bold text-slate-500 mb-1">BP (mmHg)</label><input type="text" name="bloodPressure" defaultValue={patient.bloodPressure || ""} className="w-full p-2.5 rounded-lg border border-slate-300" /></div>
            <div><label className="block text-xs mt-2 font-bold text-slate-500 mb-1">RR (cpm)</label><input type="text" name="respiratoryRate" defaultValue={patient.respiratoryRate || ""} className="w-full p-2.5 rounded-lg border border-slate-300" /></div>
            <div><label className="block text-xs mt-2 font-bold text-slate-500 mb-1">PR (bpm)</label><input type="text" name="pulseRate" defaultValue={patient.pulseRate || ""} className="w-full p-2.5 rounded-lg border border-slate-300" /></div>
            <div><label className="block text-xs mt-2 font-bold text-slate-500 mb-1">FH (cm)</label><input type="text" name="fundalHeight" defaultValue={patient.fundalHeight || ""} className="w-full p-2.5 rounded-lg border border-slate-300" /></div>
            <div><label className="block text-xs mt-2 font-bold text-slate-500 mb-1">FHT (bpm)</label><input type="text" name="fetalHeartTone" defaultValue={patient.fetalHeartTone || ""} className="w-full p-2.5 rounded-lg border border-slate-300" /></div>
          </div>
          
          <div className="mt-6 border-t border-slate-100 pt-6">
            <label className="block text-sm font-bold text-slate-800 mb-2 uppercase tracking-wider">Admitting Diagnosis</label>
            <textarea required name="admittingDiagnosis" defaultValue={patient.admittingDiagnosis || ""} rows={2} className="w-full p-2.5 rounded-lg border border-slate-300"></textarea>
          </div>
        </div>

        {/* SECTION E: History of Present Condition */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
           <h2 className="text-lg font-bold text-blue-900 border-b border-slate-100 pb-3 mb-6 uppercase tracking-wider">E. History of Present Condition</h2>
           
          <div>
            <div className="grid grid-cols-6 gap-4">
              <div><label className="block text-xs font-semibold text-slate-500 mb-1 uppercase">Gravida</label><input type="number" min="0" name="gravida" defaultValue={patient.gravida} className="w-full p-2.5 rounded-lg border border-slate-300" /></div>
              <div><label className="block text-xs font-semibold text-slate-500 mb-1 uppercase">Term</label><input type="number" min="0" name="term" defaultValue={patient.term} className="w-full p-2.5 rounded-lg border border-slate-300" /></div>
              <div><label className="block text-xs font-semibold text-slate-500 mb-1 uppercase">Preterm</label><input type="number" min="0" name="preterm" defaultValue={patient.preterm} className="w-full p-2.5 rounded-lg border border-slate-300" /></div>
              <div><label className="block text-xs font-semibold text-slate-500 mb-1 uppercase">Abortion</label><input type="number" min="0" name="abortion" defaultValue={patient.abortion} className="w-full p-2.5 rounded-lg border border-slate-300" /></div>
              <div><label className="block text-xs font-semibold text-slate-500 mb-1 uppercase">Living</label><input type="number" min="0" name="living" defaultValue={patient.living} className="w-full p-2.5 rounded-lg border border-slate-300" /></div>
              <div><label className="block text-xs font-semibold text-slate-500 mb-1 uppercase">AOG</label><input type="text" name="aog" defaultValue={patient.aog || ""} className="w-full p-2.5 rounded-lg border border-slate-300" /></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div><label className="block text-sm font-medium text-slate-700 mb-1">LMP</label><input type="date" name="lmp" defaultValue={fmt(patient.lmp)} className="w-full p-2.5 rounded-lg border border-slate-300" /></div>
              <div><label className="block text-sm font-medium text-slate-700 mb-1">EDC</label><input type="date" name="edc" defaultValue={fmt(patient.edc)} className="w-full p-2.5 rounded-lg border border-slate-300" /></div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6 pt-6 border-t border-slate-100">
            <div><label className="block text-sm font-medium text-slate-700 mb-1">BOW (+/-)</label><input type="text" name="bow" defaultValue={patient.bow || ""} className="w-full p-2.5 rounded-lg border border-slate-300" /></div>
            <div><label className="block text-sm font-medium text-slate-700 mb-1">Edema (-/+)</label><input type="text" name="historyEdema" defaultValue="(-)" className="w-full p-2.5 rounded-lg border border-slate-300" /></div>
            <div><label className="block text-sm font-medium text-slate-700 mb-1">Allergy/ies</label><input type="text" name="allergy" defaultValue={patient.allergy || "None"} className="w-full p-2.5 rounded-lg border border-slate-300" /></div>
            <div><label className="block text-sm font-medium text-slate-700 mb-1">Pre-existing Illness</label><input type="text" name="preExistingIllness" defaultValue={patient.preExistingIllness || "None"} className="w-full p-2.5 rounded-lg border border-slate-300" /></div>
          </div>
        </div>

        {/* SECTION F: Discharge Status & Final Diagnosis */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
           <h2 className="text-lg font-bold text-blue-900 border-b border-slate-100 pb-3 mb-6 uppercase tracking-wider">F. Final Diagnosis & Discharge</h2>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="col-span-full">
              <label className="block text-sm font-bold text-slate-800 mb-2">Final Diagnosis (If seen by Physician)</label>
              <textarea name="finalDiagnosis" defaultValue={patient.finalDiagnosis || ""} rows={2} className="w-full p-2.5 rounded-lg border border-slate-300"></textarea>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Date Discharged</label>
              <input type="date" name="dateDischarged" defaultValue={fmt(patient.dateDischarged)} className="w-full p-2.5 rounded-lg border border-slate-300" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Discharged By</label>
              <input type="text" name="dischargedBy" defaultValue={patient.dischargedBy || ""} className="w-full p-2.5 rounded-lg border border-slate-300" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
              <select name="status" defaultValue={patient.status} className="w-full p-2.5 rounded-lg border border-slate-300 bg-white">
                <option value="Active">Active</option>
                <option value="Discharged">Discharged</option>
              </select>
            </div>
          </div>
        </div>

        {/* Submit Bar */}
        <div className="sticky bottom-6 bg-white p-4 rounded-2xl shadow-xl border border-slate-200 flex justify-between items-center z-50">
          <p className="text-sm text-slate-500 hidden md:block">Double check all fields before saving.</p>
          <div className="flex gap-4 w-full md:w-auto">
            <Link href={`/maternal/${id}`} className="px-6 py-2.5 rounded-xl text-slate-700 hover:bg-slate-100 font-medium transition-colors w-full md:w-auto text-center">
              Cancel
            </Link>
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2.5 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 flex-1 md:flex-none shadow-md">
              <Save size={18} />
              Save Patient Data Sheet
            </button>
          </div>
        </div>

      </form>
    </div>
  );
}
