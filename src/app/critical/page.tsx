import Link from "next/link";
import { AlertCircle, ArrowLeft, Baby, Users } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { getMaternalCriticalReasons, getNewbornCriticalReasons } from "@/lib/criticalAlerts";

type AlertRow = {
  id: string;
  chartHref: string;
  patientName: string;
  admissionLabel: string;
  type: "Maternal" | "Newborn";
  reasons: string[];
  measuredAt: Date;
};

export default async function CriticalAlertsPage() {
  const [maternal, newborn] = await Promise.all([
    prisma.maternalPatient.findMany({
      where: { status: "Active" },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        admissionNumber: true,
        vitalSigns: {
          orderBy: { createdAt: "desc" },
          take: 1,
          select: {
            id: true,
            date: true,
            time: true,
            bloodPressure: true,
            pulseRate: true,
            respiratoryRate: true,
            temperature: true,
            createdAt: true,
          },
        },
      },
    }),
    prisma.newbornRecord.findMany({
      where: { status: "Active" },
      select: {
        id: true,
        name: true,
        vitalSigns: {
          orderBy: { createdAt: "desc" },
          take: 1,
          select: {
            id: true,
            date: true,
            time: true,
            bloodPressure: true,
            pulseRate: true,
            respiratoryRate: true,
            temperature: true,
            createdAt: true,
          },
        },
      },
    }),
  ]);

  const alerts: AlertRow[] = [];

  for (const patient of maternal) {
    const latest = patient.vitalSigns[0];
    const reasons = getMaternalCriticalReasons(latest);
    if (!latest || reasons.length === 0) continue;

    alerts.push({
      id: `maternal-${patient.id}`,
      chartHref: `/maternal/${patient.id}?tab=Vital%20Signs&vitalId=${latest.id}&alert=${encodeURIComponent(reasons.join("; "))}`,
      patientName: `${patient.lastName}, ${patient.firstName}`,
      admissionLabel: `ADM # ${patient.admissionNumber}`,
      type: "Maternal",
      reasons,
      measuredAt: latest.createdAt,
    });
  }

  for (const baby of newborn) {
    const latest = baby.vitalSigns[0];
    const reasons = getNewbornCriticalReasons(latest);
    if (!latest || reasons.length === 0) continue;

    alerts.push({
      id: `newborn-${baby.id}`,
      chartHref: `/newborn/${baby.id}?tab=Vital%20Signs&vitalId=${latest.id}&alert=${encodeURIComponent(reasons.join("; "))}`,
      patientName: baby.name,
      admissionLabel: "Newborn Record",
      type: "Newborn",
      reasons,
      measuredAt: latest.createdAt,
    });
  }

  alerts.sort((a, b) => b.measuredAt.getTime() - a.measuredAt.getTime());

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-20">
      <div className="glass-card p-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="p-2 rounded-full hover:bg-white/50 transition-colors border border-white/60">
            <ArrowLeft size={20} className="text-slate-700" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Critical Alerts</h1>
            <p className="text-slate-500 mt-1">Click any alert to open the exact chart section with the reason.</p>
          </div>
        </div>
        <div className="px-4 py-2 rounded-xl bg-rose-100/70 border border-rose-300/50 text-rose-800 font-semibold">
          {alerts.length} Active Alert{alerts.length === 1 ? "" : "s"}
        </div>
      </div>

      {alerts.length === 0 ? (
        <div className="glass-card p-10 text-center text-slate-600">
          No critical alerts right now.
        </div>
      ) : (
        <div className="space-y-4">
          {alerts.map((alert) => (
            <div key={alert.id} className="glass-card p-5 border-l-4 border-rose-500/90">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    {alert.type === "Maternal" ? (
                      <Users size={18} className="text-rose-600" />
                    ) : (
                      <Baby size={18} className="text-rose-600" />
                    )}
                    <p className="font-bold text-slate-900">{alert.patientName}</p>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-white/60 border border-white/80 text-slate-600">
                      {alert.type}
                    </span>
                    <span className="text-xs text-slate-500">{alert.admissionLabel}</span>
                  </div>

                  <div className="flex items-start gap-2 text-rose-700">
                    <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
                    <div className="text-sm">
                      {alert.reasons.map((reason) => (
                        <p key={reason}>{reason}</p>
                      ))}
                    </div>
                  </div>
                </div>

                <Link
                  href={alert.chartHref}
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-sm font-semibold transition-colors"
                >
                  Go To Vital Signs
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
