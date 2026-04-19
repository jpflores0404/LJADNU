import { createMaternalRecord } from "@/app/actions/maternal";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";

export default function NewMaternalRecord() {
  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20">
      <div className="flex items-center gap-4">
        <Link href="/maternal" className="p-2 hover:bg-slate-200 rounded-full transition-colors">
          <ArrowLeft size={20} className="text-slate-600" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Patient Data Sheet</h1>
          <p className="text-slate-500 mt-1">Complete admission fields for the expectant mother.</p>
        </div>
      </div>

      <form action={createMaternalRecord} className="space-y-8">
        
        {/* SECTION A: Demographics */}
        <div className="glass-card p-8">
          <h2 className="text-lg font-bold text-blue-900 border-b border-slate-100 pb-3 mb-6 uppercase tracking-wider">A. Patient Demographics</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="col-span-full md:col-span-1">
              <label className="block text-sm font-medium text-slate-700 mb-1">Bed Number</label>
              <input type="text" name="bedNumber" className="w-full p-2.5 rounded-lg glass-input text-slate-900 shadow-sm transition-all focus:ring-2 focus:ring-blue-400/50 outline-none" />
            </div>
            
            <div className="col-span-full md:col-span-1">
              <label className="block text-sm font-medium text-slate-700 mb-1">Last Name</label>
              <input required type="text" name="lastName" className="w-full p-2.5 rounded-lg glass-input text-slate-900 shadow-sm transition-all focus:ring-2 focus:ring-blue-400/50 outline-none" />
            </div>
            <div className="col-span-full md:col-span-1">
              <label className="block text-sm font-medium text-slate-700 mb-1">First Name</label>
              <input required type="text" name="firstName" className="w-full p-2.5 rounded-lg glass-input text-slate-900 shadow-sm transition-all focus:ring-2 focus:ring-blue-400/50 outline-none" />
            </div>
            <div className="col-span-full md:col-span-1">
              <label className="block text-sm font-medium text-slate-700 mb-1">Middle Name</label>
              <input type="text" name="middleName" className="w-full p-2.5 rounded-lg glass-input text-slate-900 shadow-sm transition-all focus:ring-2 focus:ring-blue-400/50 outline-none" />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Age</label>
              <input required type="number" name="age" className="w-full p-2.5 rounded-lg glass-input text-slate-900 shadow-sm transition-all focus:ring-2 focus:ring-blue-400/50 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Gender</label>
              <input type="text" name="gender" defaultValue="Female" className="w-full p-2.5 rounded-lg glass-input text-slate-900 shadow-sm transition-all focus:ring-2 focus:ring-blue-400/50 outline-none" readOnly />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Civil Status</label>
              <select name="civilStatus" className="w-full p-2.5 rounded-lg border border-slate-300 bg-white">
                <option value="Single">Single</option>
                <option value="Married">Married</option>
                <option value="Widowed">Widowed</option>
                <option value="Separated">Separated</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Religion</label>
              <input type="text" name="religion" className="w-full p-2.5 rounded-lg glass-input text-slate-900 shadow-sm transition-all focus:ring-2 focus:ring-blue-400/50 outline-none" />
            </div>

            <div className="col-span-full">
              <label className="block text-sm font-medium text-slate-700 mb-1">Complete Address</label>
              <input required type="text" name="address" className="w-full p-2.5 rounded-lg glass-input text-slate-900 shadow-sm transition-all focus:ring-2 focus:ring-blue-400/50 outline-none" />
            </div>

            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">Date of Birth</label>
              <input required type="date" name="dateOfBirth" className="w-full p-2.5 rounded-lg glass-input text-slate-900 shadow-sm transition-all focus:ring-2 focus:ring-blue-400/50 outline-none" />
            </div>
            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">Place of Birth</label>
              <input type="text" name="placeOfBirth" className="w-full p-2.5 rounded-lg glass-input text-slate-900 shadow-sm transition-all focus:ring-2 focus:ring-blue-400/50 outline-none" />
            </div>

            <div className="col-span-1 md:col-span-1">
              <label className="block text-sm font-medium text-slate-700 mb-1">Nationality</label>
              <input type="text" name="nationality" defaultValue="Filipino" className="w-full p-2.5 rounded-lg glass-input text-slate-900 shadow-sm transition-all focus:ring-2 focus:ring-blue-400/50 outline-none" />
            </div>
            <div className="col-span-1 md:col-span-1">
              <label className="block text-sm font-medium text-slate-700 mb-1">Occupation</label>
              <input type="text" name="occupation" className="w-full p-2.5 rounded-lg glass-input text-slate-900 shadow-sm transition-all focus:ring-2 focus:ring-blue-400/50 outline-none" />
            </div>
            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">Employer</label>
              <input type="text" name="employer" className="w-full p-2.5 rounded-lg glass-input text-slate-900 shadow-sm transition-all focus:ring-2 focus:ring-blue-400/50 outline-none" />
            </div>
            
            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">Date Admitted</label>
              <input type="date" name="dateAdmitted" defaultValue={new Date().toISOString().split('T')[0]} className="w-full p-2.5 rounded-lg glass-input text-slate-900 shadow-sm transition-all focus:ring-2 focus:ring-blue-400/50 outline-none" />
            </div>
            <div className="col-span-1 md:col-span-1">
              <label className="block text-sm font-medium text-slate-700 mb-1">Time Admitted</label>
              <input type="time" name="timeAdmitted" className="w-full p-2.5 rounded-lg glass-input text-slate-900 shadow-sm transition-all focus:ring-2 focus:ring-blue-400/50 outline-none" />
            </div>
            <div className="col-span-1 md:col-span-1">
              <label className="block text-sm font-medium text-slate-700 mb-1">Admitted By</label>
              <input type="text" name="admittedBy" className="w-full p-2.5 rounded-lg glass-input text-slate-900 shadow-sm transition-all focus:ring-2 focus:ring-blue-400/50 outline-none" />
            </div>
          </div>
        </div>

        {/* SECTION B: PhilHealth */}
        <div className="glass-card p-8">
          <h2 className="text-lg font-bold text-blue-900 border-b border-slate-100 pb-3 mb-6 uppercase tracking-wider">B. PhilHealth Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">PhilHealth Number</label>
              <input type="text" name="philhealthNumber" className="w-full p-2.5 rounded-lg glass-input text-slate-900 shadow-sm transition-all focus:ring-2 focus:ring-blue-400/50 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Type</label>
              <select name="philhealthStatus" className="w-full p-2.5 rounded-lg border border-slate-300 bg-white">
                <option value="Member">Member</option>
                <option value="Dependent">Dependent</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Name of Member</label>
              <input type="text" name="philhealthMemberName" className="w-full p-2.5 rounded-lg glass-input text-slate-900 shadow-sm transition-all focus:ring-2 focus:ring-blue-400/50 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Relation to Patient</label>
              <input type="text" name="philhealthMemberRelation" className="w-full p-2.5 rounded-lg glass-input text-slate-900 shadow-sm transition-all focus:ring-2 focus:ring-blue-400/50 outline-none" />
            </div>
            <div className="col-span-full">
              <label className="block text-sm font-medium text-slate-700 mb-1">Member Address</label>
              <input type="text" name="philhealthMemberAddress" className="w-full p-2.5 rounded-lg glass-input text-slate-900 shadow-sm transition-all focus:ring-2 focus:ring-blue-400/50 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Contact Number</label>
              <input type="text" name="philhealthMemberContact" className="w-full p-2.5 rounded-lg glass-input text-slate-900 shadow-sm transition-all focus:ring-2 focus:ring-blue-400/50 outline-none" />
            </div>
          </div>
        </div>

        {/* SECTION C: Family & Emergency Contact */}
        <div className="glass-card p-8">
          <h2 className="text-lg font-bold text-blue-900 border-b border-slate-100 pb-3 mb-6 uppercase tracking-wider">C. Family & Emergency Contacts</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-full space-y-4">
              <h3 className="font-semibold text-slate-700">Husband / LIP</h3>
              <div className="grid grid-cols-2 gap-4">
                <input type="text" name="husbandName" placeholder="Name" className="w-full p-2.5 rounded-lg glass-input text-slate-900 shadow-sm transition-all focus:ring-2 focus:ring-blue-400/50 outline-none" />
                <input type="tel" name="contactNumber" placeholder="Contact Number" className="w-full p-2.5 rounded-lg glass-input text-slate-900 shadow-sm transition-all focus:ring-2 focus:ring-blue-400/50 outline-none" />
                <input type="text" name="husbandOccupation" placeholder="Occupation" className="w-full p-2.5 rounded-lg glass-input text-slate-900 shadow-sm transition-all focus:ring-2 focus:ring-blue-400/50 outline-none" />
                <input type="text" name="husbandEmployer" placeholder="Employer" className="w-full p-2.5 rounded-lg glass-input text-slate-900 shadow-sm transition-all focus:ring-2 focus:ring-blue-400/50 outline-none" />
              </div>
            </div>

            <div className="col-span-full space-y-4">
              <h3 className="font-semibold text-slate-700">Parents</h3>
              <div className="grid grid-cols-2 gap-4">
                <input type="text" name="fatherName" placeholder="Father's Name" className="w-full p-2.5 rounded-lg glass-input text-slate-900 shadow-sm transition-all focus:ring-2 focus:ring-blue-400/50 outline-none" />
                <input type="text" name="fatherAddress" placeholder="Father's Address" className="w-full p-2.5 rounded-lg glass-input text-slate-900 shadow-sm transition-all focus:ring-2 focus:ring-blue-400/50 outline-none" />
                <input type="text" name="motherName" placeholder="Mother's Name" className="w-full p-2.5 rounded-lg glass-input text-slate-900 shadow-sm transition-all focus:ring-2 focus:ring-blue-400/50 outline-none" />
                <input type="text" name="motherAddress" placeholder="Mother's Address" className="w-full p-2.5 rounded-lg glass-input text-slate-900 shadow-sm transition-all focus:ring-2 focus:ring-blue-400/50 outline-none" />
              </div>
            </div>

            <div className="col-span-full space-y-4">
              <h3 className="font-semibold text-slate-700">Person to be Notified in Case of Emergency</h3>
              <div className="grid grid-cols-2 gap-4">
                <input type="text" name="companionName" placeholder="Name" className="w-full p-2.5 rounded-lg glass-input text-slate-900 shadow-sm transition-all focus:ring-2 focus:ring-blue-400/50 outline-none" />
                <input type="text" name="companionRelation" placeholder="Relation to Patient" className="w-full p-2.5 rounded-lg glass-input text-slate-900 shadow-sm transition-all focus:ring-2 focus:ring-blue-400/50 outline-none" />
                <input type="text" name="companionAddress" placeholder="Address" className="w-full p-2.5 rounded-lg glass-input text-slate-900 shadow-sm transition-all focus:ring-2 focus:ring-blue-400/50 outline-none" />
                <input type="tel" name="companionContact" placeholder="Contact Number" className="w-full p-2.5 rounded-lg glass-input text-slate-900 shadow-sm transition-all focus:ring-2 focus:ring-blue-400/50 outline-none" />
              </div>
            </div>
          </div>
        </div>

        {/* SECTION D: Physical Examination */}
        <div className="glass-card p-8">
          <h2 className="text-lg font-bold text-blue-900 border-b border-slate-100 pb-3 mb-6 uppercase tracking-wider">D. Physical Examination (PE)</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div>
               <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">IE (Gen. App.)</label>
               <input type="text" name="generalAppearance" placeholder="Awake, coherent" className="w-full p-2.5 rounded-lg glass-input text-slate-900 shadow-sm transition-all focus:ring-2 focus:ring-blue-400/50 outline-none" />
            </div>
            <div>
               <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Edema</label>
               <input type="text" name="edema" placeholder="None" className="w-full p-2.5 rounded-lg glass-input text-slate-900 shadow-sm transition-all focus:ring-2 focus:ring-blue-400/50 outline-none" />
            </div>
            <div>
               <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Pallor</label>
               <input type="text" name="pallor" placeholder="Y/N" className="w-full p-2.5 rounded-lg glass-input text-slate-900 shadow-sm transition-all focus:ring-2 focus:ring-blue-400/50 outline-none" />
            </div>
            <div>
               <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Pale</label>
               <input type="text" name="pale" placeholder="Mild" className="w-full p-2.5 rounded-lg glass-input text-slate-900 shadow-sm transition-all focus:ring-2 focus:ring-blue-400/50 outline-none" />
            </div>
            <div>
               <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Sunken Eye</label>
               <input type="text" name="sunkenEye" placeholder="Y/N" className="w-full p-2.5 rounded-lg glass-input text-slate-900 shadow-sm transition-all focus:ring-2 focus:ring-blue-400/50 outline-none" />
            </div>

            <div><label className="block text-xs mt-2 font-bold text-slate-500 mb-1">TEMP</label><input type="text" name="temperature" className="w-full p-2.5 rounded-lg glass-input text-slate-900 shadow-sm transition-all focus:ring-2 focus:ring-blue-400/50 outline-none" /></div>
            <div><label className="block text-xs mt-2 font-bold text-slate-500 mb-1">BP (mmHg)</label><input type="text" name="bloodPressure" className="w-full p-2.5 rounded-lg glass-input text-slate-900 shadow-sm transition-all focus:ring-2 focus:ring-blue-400/50 outline-none" /></div>
            <div><label className="block text-xs mt-2 font-bold text-slate-500 mb-1">RR (cpm)</label><input type="text" name="respiratoryRate" className="w-full p-2.5 rounded-lg glass-input text-slate-900 shadow-sm transition-all focus:ring-2 focus:ring-blue-400/50 outline-none" /></div>
            <div><label className="block text-xs mt-2 font-bold text-slate-500 mb-1">PR (bpm)</label><input type="text" name="pulseRate" className="w-full p-2.5 rounded-lg glass-input text-slate-900 shadow-sm transition-all focus:ring-2 focus:ring-blue-400/50 outline-none" /></div>
            <div><label className="block text-xs mt-2 font-bold text-slate-500 mb-1">FH (cm)</label><input type="text" name="fundalHeight" className="w-full p-2.5 rounded-lg glass-input text-slate-900 shadow-sm transition-all focus:ring-2 focus:ring-blue-400/50 outline-none" /></div>
            <div><label className="block text-xs mt-2 font-bold text-slate-500 mb-1">FHT (bpm)</label><input type="text" name="fetalHeartTone" className="w-full p-2.5 rounded-lg glass-input text-slate-900 shadow-sm transition-all focus:ring-2 focus:ring-blue-400/50 outline-none" /></div>
          </div>
          
          <div className="mt-6 border-t border-slate-100 pt-6">
            <label className="block text-sm font-bold text-slate-800 mb-2 uppercase tracking-wider">Admitting Diagnosis</label>
            <textarea required name="admittingDiagnosis" rows={2} className="w-full p-2.5 rounded-lg glass-input text-slate-900 shadow-sm transition-all focus:ring-2 focus:ring-blue-400/50 outline-none"></textarea>
          </div>
        </div>

        {/* SECTION E: History of Present Condition */}
        <div className="glass-card p-8">
           <h2 className="text-lg font-bold text-blue-900 border-b border-slate-100 pb-3 mb-6 uppercase tracking-wider">E. History of Present Condition</h2>
           
          <div>
            <div className="grid grid-cols-6 gap-4">
              <div><label className="block text-xs font-semibold text-slate-500 mb-1 uppercase">Gravida</label><input type="number" min="0" name="gravida" className="w-full p-2.5 rounded-lg glass-input text-slate-900 shadow-sm transition-all focus:ring-2 focus:ring-blue-400/50 outline-none" /></div>
              <div><label className="block text-xs font-semibold text-slate-500 mb-1 uppercase">Term</label><input type="number" min="0" name="term" className="w-full p-2.5 rounded-lg glass-input text-slate-900 shadow-sm transition-all focus:ring-2 focus:ring-blue-400/50 outline-none" /></div>
              <div><label className="block text-xs font-semibold text-slate-500 mb-1 uppercase">Preterm</label><input type="number" min="0" name="preterm" className="w-full p-2.5 rounded-lg glass-input text-slate-900 shadow-sm transition-all focus:ring-2 focus:ring-blue-400/50 outline-none" /></div>
              <div><label className="block text-xs font-semibold text-slate-500 mb-1 uppercase">Abortion</label><input type="number" min="0" name="abortion" className="w-full p-2.5 rounded-lg glass-input text-slate-900 shadow-sm transition-all focus:ring-2 focus:ring-blue-400/50 outline-none" /></div>
              <div><label className="block text-xs font-semibold text-slate-500 mb-1 uppercase">Living</label><input type="number" min="0" name="living" className="w-full p-2.5 rounded-lg glass-input text-slate-900 shadow-sm transition-all focus:ring-2 focus:ring-blue-400/50 outline-none" /></div>
              <div><label className="block text-xs font-semibold text-slate-500 mb-1 uppercase">AOG</label><input type="text" name="aog" className="w-full p-2.5 rounded-lg glass-input text-slate-900 shadow-sm transition-all focus:ring-2 focus:ring-blue-400/50 outline-none" /></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div><label className="block text-sm font-medium text-slate-700 mb-1">LMP</label><input type="date" name="lmp" className="w-full p-2.5 rounded-lg glass-input text-slate-900 shadow-sm transition-all focus:ring-2 focus:ring-blue-400/50 outline-none" /></div>
              <div><label className="block text-sm font-medium text-slate-700 mb-1">EDC</label><input type="date" name="edc" className="w-full p-2.5 rounded-lg glass-input text-slate-900 shadow-sm transition-all focus:ring-2 focus:ring-blue-400/50 outline-none" /></div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6 pt-6 border-t border-slate-100">
            <div><label className="block text-sm font-medium text-slate-700 mb-1">BOW (+/-)</label><input type="text" name="bow" className="w-full p-2.5 rounded-lg glass-input text-slate-900 shadow-sm transition-all focus:ring-2 focus:ring-blue-400/50 outline-none" /></div>
            <div><label className="block text-sm font-medium text-slate-700 mb-1">Edema (-/+)</label><input type="text" name="historyEdema" defaultValue="(-)" className="w-full p-2.5 rounded-lg glass-input text-slate-900 shadow-sm transition-all focus:ring-2 focus:ring-blue-400/50 outline-none" /></div>
            <div><label className="block text-sm font-medium text-slate-700 mb-1">Allergy/ies</label><input type="text" name="allergy" defaultValue="None" className="w-full p-2.5 rounded-lg glass-input text-slate-900 shadow-sm transition-all focus:ring-2 focus:ring-blue-400/50 outline-none" /></div>
            <div><label className="block text-sm font-medium text-slate-700 mb-1">Pre-existing Illness</label><input type="text" name="preExistingIllness" defaultValue="None" className="w-full p-2.5 rounded-lg glass-input text-slate-900 shadow-sm transition-all focus:ring-2 focus:ring-blue-400/50 outline-none" /></div>
          </div>
        </div>

        {/* SECTION F: Final Diagnosis */}
        <div className="glass-card p-8">
           <h2 className="text-lg font-bold text-blue-900 border-b border-slate-100 pb-3 mb-6 uppercase tracking-wider">F. Final Diagnosis</h2>
           <div className="col-span-full">
              <label className="block text-sm font-bold text-slate-800 mb-2">Final Diagnosis (If seen by Physician)</label>
              <textarea name="finalDiagnosis" rows={2} className="w-full p-2.5 rounded-lg glass-input text-slate-900 shadow-sm transition-all focus:ring-2 focus:ring-blue-400/50 outline-none"></textarea>
           </div>
        </div>

        {/* Submit Bar */}
        <div className="sticky bottom-6 glass-panel p-4 flex justify-between items-center z-50">
          <p className="text-sm text-slate-600 hidden md:block">Double check all fields before saving.</p>
          <div className="flex gap-4 w-full md:w-auto">
            <Link href="/maternal" className="px-6 py-2.5 rounded-xl bg-white/40 text-slate-800 hover:bg-white/70 font-semibold border border-white/60 backdrop-blur-sm transition-all shadow-sm w-full md:w-auto text-center">
              Cancel
            </Link>
            <button type="submit" className="glass-button-primary px-8 py-2.5 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 flex-1 md:flex-none shadow-md">
              <Save size={18} />
              Save Patient Data Sheet
            </button>
          </div>
        </div>

      </form>
    </div>
  );
}
