import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Baby, Search } from "lucide-react";

export default async function NewbornRecordsList() {
  const newborns = await prisma.newbornRecord.findMany({
    orderBy: { createdAt: "desc" },
    include: {
        maternalPatient: {
            select: {
                firstName: true,
                lastName: true,
            }
        }
    }
  });

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Newborn Records</h1>
          <p className="text-slate-500 mt-2">Manage all registered newborns and delivery data.</p>
        </div>
      </div>

      <div className="glass-card overflow-hidden">
        <div className="p-4 glass-header">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by newborn name or mother's name..." 
              className="w-full pl-10 pr-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400/50 text-slate-700 placeholder-slate-400 glass-input transition-all duration-300"
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="glass-header text-slate-700 text-sm">
                <th className="p-4 font-semibold">Newborn Name</th>
                <th className="p-4 font-semibold">Mother&apos;s Name</th>
                <th className="p-4 font-semibold">Gender</th>
                <th className="p-4 font-semibold">Date/Time of Birth</th>
                <th className="p-4 font-semibold">Delivery</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {newborns.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-500">
                    No newborn records found.
                  </td>
                </tr>
              ) : (
                newborns.map((nb) => (
                  <tr key={nb.id} className="border-b border-white/40 hover:bg-white/30 transition-colors">
                    <td className="p-4 font-semibold text-slate-900">
                      <div className="flex items-center gap-3">
                         <div className={`p-1.5 rounded-full ${nb.gender === 'Male' ? 'bg-blue-100/50 text-blue-700' : nb.gender === 'Female' ? 'bg-sky-100/50 text-sky-700' : 'bg-slate-100/50 text-slate-700'} backdrop-blur-sm`}>
                            <Baby size={16} />
                         </div>
                         {nb.name}
                      </div>
                    </td>
                    <td className="p-4 text-slate-700">{nb.maternalPatient.lastName}, {nb.maternalPatient.firstName}</td>
                    <td className="p-4 text-slate-700">{nb.gender}</td>
                    <td className="p-4 text-slate-700">
                      {new Date(nb.dateOfBirth).toLocaleDateString()} at {nb.timeOfBirth || "N/A"}
                    </td>
                    <td className="p-4 text-slate-700">
                      {nb.mannerOfDelivery}
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <Link 
                        href={`/newborn/${nb.id}`} 
                        className="inline-block border border-white/60 hover:border-blue-400 bg-white/40 hover:bg-white/80 text-blue-700 px-3 py-1.5 rounded-xl text-sm font-semibold shadow-sm transition-all"
                      >
                        View Chart
                      </Link>
                      <Link 
                        href={`/maternal/${nb.maternalPatientId}`} 
                        className="inline-block border border-white/60 hover:border-blue-400 bg-white/40 hover:bg-white/80 text-slate-700 px-3 py-1.5 rounded-xl text-sm font-semibold shadow-sm transition-all"
                      >
                        Mother
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
