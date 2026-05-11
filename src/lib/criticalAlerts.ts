type CriticalVitals = {
  bloodPressure?: string | null;
  pulseRate?: string | null;
  respiratoryRate?: string | null;
  temperature?: string | null;
};

export function getMaternalCriticalReasons(vitals: CriticalVitals | null | undefined): string[] {
  if (!vitals) return [];

  const reasons: string[] = [];

  if (vitals.bloodPressure) {
    const [sys, dia] = vitals.bloodPressure
      .split("/")
      .map((n: string) => Number.parseInt(n.trim(), 10));
    if (!Number.isNaN(sys) && (sys > 160 || sys < 90)) {
      reasons.push(`Systolic BP ${sys} mmHg is outside safe range (90-160)`);
    }
    if (!Number.isNaN(dia) && (dia > 110 || dia < 60)) {
      reasons.push(`Diastolic BP ${dia} mmHg is outside safe range (60-110)`);
    }
  }

  const hr = Number.parseInt(vitals.pulseRate ?? "", 10);
  if (!Number.isNaN(hr) && (hr > 120 || hr < 60)) {
    reasons.push(`Pulse rate ${hr} bpm is outside safe range (60-120)`);
  }

  const rr = Number.parseInt(vitals.respiratoryRate ?? "", 10);
  if (!Number.isNaN(rr) && (rr > 24 || rr < 12)) {
    reasons.push(`Respiratory rate ${rr} cpm is outside safe range (12-24)`);
  }

  const temp = Number.parseFloat(vitals.temperature ?? "");
  if (!Number.isNaN(temp) && (temp > 38.0 || temp < 36.0)) {
    reasons.push(`Temperature ${temp} C is outside safe range (36.0-38.0)`);
  }

  return reasons;
}

export function getNewbornCriticalReasons(vitals: CriticalVitals | null | undefined): string[] {
  if (!vitals) return [];

  const reasons: string[] = [];

  const hr = Number.parseInt(vitals.pulseRate ?? "", 10);
  if (!Number.isNaN(hr) && (hr > 160 || hr < 100)) {
    reasons.push(`Pulse rate ${hr} bpm is outside newborn range (100-160)`);
  }

  const rr = Number.parseInt(vitals.respiratoryRate ?? "", 10);
  if (!Number.isNaN(rr) && (rr > 60 || rr < 30)) {
    reasons.push(`Respiratory rate ${rr} cpm is outside newborn range (30-60)`);
  }

  const temp = Number.parseFloat(vitals.temperature ?? "");
  if (!Number.isNaN(temp) && (temp > 37.5 || temp < 36.5)) {
    reasons.push(`Temperature ${temp} C is outside newborn range (36.5-37.5)`);
  }

  return reasons;
}

export function isMaternalCritical(vitals: CriticalVitals | null | undefined): boolean {
  return getMaternalCriticalReasons(vitals).length > 0;
}

export function isNewbornCritical(vitals: CriticalVitals | null | undefined): boolean {
  return getNewbornCriticalReasons(vitals).length > 0;
}
