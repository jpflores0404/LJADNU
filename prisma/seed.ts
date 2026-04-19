import { PrismaClient } from "@prisma/client";

async function main() {
  const prisma = new PrismaClient();

  // Clear existing
  await prisma.maternalPatient.deleteMany({});
  await prisma.newbornRecord.deleteMany({});

  // Re-seed Patient 1
  const patient1 = await prisma.maternalPatient.create({
    data: {
      admissionNumber: "ADM-2026-001",
      bedNumber: "A-01",
      lastName: "Dela Cruz",
      firstName: "Maria",
      middleName: "Santos",
      age: 28,
      address: "123 Main St, Manila",
      dateOfBirth: new Date("1998-05-15"),
      contactNumber: "09123456789",
      attendingPhysician: "Dr. Jane Smith",
      admittingDiagnosis: "G1P0, Pregnancy Uterine, 38 weeks AOG",
      status: "Active",
      vitalSigns: { create: [{ date: "2026-04-18", time: "08:00 AM", bloodPressure: "120/80", pulseRate: "82", respiratoryRate: "20", temperature: "36.8", signature: "RN. Cruz" }] },
      medications: { create: [{ medicationName: "Iron Supplement", dateGiven: "2026-04-18", timeGiven: "08:00 AM", route: "PO", givenBy: "RN. Cruz" }] }
    }
  });

  // Jobert Romulio S. Catacutan and Mother Maria Leonora S. Catacutan
  const patient2 = await prisma.maternalPatient.create({
    data: {
      admissionNumber: "ADM-2026-002",
      bedNumber: "B-03",
      lastName: "Catacutan",
      firstName: "Maria Leonora",
      middleName: "S.",
      age: 25,
      address: "Zone 2, Brgy. San Jose, Milaor, Camarines Sur",
      dateOfBirth: new Date("2001-08-11"),
      contactNumber: "09987654321",
      attendingPhysician: "Dr. Mark Lee",
      admittingDiagnosis: "G2P1 Pregnancy, 38 weeks AOG, in active labor",
      finalDiagnosis: "G2P2, Normal Spontaneous Vaginal Delivery, Term Pregnancy",
      status: "Active",
      
      // History of Present Condition
      lmp: new Date("2025-07-20"),
      edc: new Date("2026-04-27"),
      aog: "38 weeks",
      bow: "(+)",
      allergy: "None",
      preExistingIllness: "None",

      // Physical Examination Baseline
      generalAppearance: "Awake, coherent",
      edema: "None",
      pallor: "Y",
      pale: "Mild",
      sunkenEye: "N",
      temperature: "37.8°C",
      bloodPressure: "110/70 mmHg",
      respiratoryRate: "20 bpm",
      pulseRate: "88 bpm",
      fundalHeight: "38 cm",
      fetalHeartTone: "140 bpm",
      
      newborns: {
        create: [
          {
            name: "Jobert Romulio S. Catacutan",
            gender: "Male",
            dateOfBirth: new Date("2026-04-14"),
            timeOfBirth: "10:57 PM",
            mannerOfDelivery: "NSD",
            icdCode: "Z38.0",
            admissionDiagnosis: "Newborn, single liveborn, appropriate for gestational age (AGA), Stable vital signs",
            finalDiagnosis: "Healthy term newborn, appropriate for gestational age (AGA), Stable vital signs",
            weight: 3.2,
            length: 50,
            headCircumference: 34,
            chestCircumference: 32,
            abdominalCircumference: 31,
            apgarScores: {
              create: [
                { minuteType: "1min", heartRate: 2, respiratoryEffort: 2, muscleTone: 2, reflexIrritability: 2, skinColor: 1, totalScore: 9 },
                { minuteType: "5min", heartRate: 2, respiratoryEffort: 2, muscleTone: 2, reflexIrritability: 2, skinColor: 2, totalScore: 10 },
              ]
            },
            vitalSigns: {
               create: [
                  { date: "2026-04-14", time: "11:30 PM", pulseRate: "142", respiratoryRate: "44", temperature: "36.7", signature: "RN. Ballester" },
                  { date: "2026-04-14", time: "11:45 PM", pulseRate: "140", respiratoryRate: "42", temperature: "36.6", signature: "RN. Ballester" },
                  { date: "2026-04-14", time: "12:00 AM", pulseRate: "138", respiratoryRate: "40", temperature: "36.8", signature: "RN. Arcilla" },
                  { date: "2026-04-14", time: "12:15 AM", pulseRate: "145", respiratoryRate: "46", temperature: "36.7", signature: "RN. Arcilla" },
                  { date: "2026-04-14", time: "12:30 AM", pulseRate: "144", respiratoryRate: "45", temperature: "36.9", signature: "RN. Saldo" },
                  { date: "2026-04-15", time: "1:00 AM", pulseRate: "142", respiratoryRate: "44", temperature: "36.8", signature: "RN. Dazo" },
                  { date: "2026-04-15", time: "1:30 AM", pulseRate: "146", respiratoryRate: "47", temperature: "36.7", signature: "RN. Dazo" },
                  { date: "2026-04-15", time: "2:30 AM", pulseRate: "138", respiratoryRate: "40", temperature: "36.7", signature: "RN. Dazo" },
                  { date: "2026-04-15", time: "6:00 AM", pulseRate: "140", respiratoryRate: "42", temperature: "36.8", signature: "RN. Cruz" },
                  { date: "2026-04-15", time: "10:00 AM", pulseRate: "142", respiratoryRate: "44", temperature: "36.9", signature: "RN. Cruz" },
                  { date: "2026-04-15", time: "2:00 PM", pulseRate: "139", respiratoryRate: "41", temperature: "36.7", signature: "RN. Cruz" },
                  { date: "2026-04-15", time: "6:00 PM", pulseRate: "137", respiratoryRate: "40", temperature: "36.6", signature: "RN. Ballester" },
                  { date: "2026-04-16", time: "6:00 AM", pulseRate: "139", respiratoryRate: "42", temperature: "36.7", signature: "RN. Ballester" },
                  { date: "2026-04-16", time: "10:00 AM", pulseRate: "141", respiratoryRate: "43", temperature: "36.8", signature: "RN. Arcilla" },
                  { date: "2026-04-16", time: "2:00 PM", pulseRate: "138", respiratoryRate: "41", temperature: "36.7", signature: "RN. Arcilla" },
               ]
            },
            medications: {
               create: [
                  { medicationName: "Erythromycin Ointment", dateGiven: "2026-04-14", timeGiven: "11:37 PM", route: "Ophthalmic", givenBy: "Elijah Daumier B. Ballester, RN" },
                  { medicationName: "Vitamin K", dateGiven: "2026-04-14", timeGiven: "11:39 PM", route: "IM", givenBy: "Lou Janzen T. Arcilla, RN" },
                  { medicationName: "Hepatitis B Vaccine", dateGiven: "2026-04-14", timeGiven: "11:42 PM", route: "IM", givenBy: "Kia Jamella V. Saldo, RN" },
                  { medicationName: "BCG Vaccine", dateGiven: "2026-04-15", timeGiven: "11:45 PM", route: "ID", givenBy: "Deborah Paula V. Dazo, RN" },
               ]
            },
            outputCharts: {
               create: [
                  { date: "2026-04-14", shift: "PM", stoolCount: 2, urineCount: 3 },
                  { date: "2026-04-15", shift: "AM", stoolCount: 1, urineCount: 2 },
                  { date: "2026-04-15", shift: "PM", stoolCount: 2, urineCount: 3 },
                  { date: "2026-04-16", shift: "AM", stoolCount: 1, urineCount: 3 },
               ]
            },
            nurseNotes: {
               create: [
                  {
                     date: "2026-04-14", time: "11:00 PM", shift: "PM",
                     focus: "Immediate Newborn Care",
                     data: "Newly delivered an active baby boy NSD in Cephalic Presentation at 10:57 PM; vigorous cry and active movement of extremities noted; pinkish skin color noted; initial vital signs: T 36.7 °C, PR 142 bpm, RR 44 breaths/min.",
                     action: "Gently dried baby from face to trunk to extremities using clean cloth for 30 seconds; removed soiled linen; placed baby above mother's abdomen to facilitate skin-to-skin contact; placed bonnet on baby's head; clamped and cut cord aseptically after no pulsations are felt; checked baby's color and breathing through APGAR scoring; initiated breastfeeding within the first hour of life; Administered Erythromycin eye ointment 1 squeeze on both eyes; injected Vitamin K IM on left thigh upper quadrant, Hepatitis B IM on right thigh upper quadrant, BCG vaccine ID on right deltoid; anthropometric measurements recorded; dressed baby; placed baby in mother's arms.",
                     response: "Baby skin-to-skin contact over 90 minutes; breastfeeding successfully initiated within first hour and good sucking and attachment noted; APGAR score: 10; latest vital signs: T 36.6 °C, PR 150 bpm, RR 43 breaths/min."
                  },
                  {
                     date: "2026-04-15", time: "06:00 AM", shift: "AM",
                     focus: "Risk for Hypothermia",
                     data: "Received newborn rooming-in with mother and wrapped in blanket; newborn delivered via NSD; skin is warm, pink, with vernix caseosa on some areas; no signs of hypothermia such as cyanosis, lethargy, or weak cry observed; cool room temperature at 22 °C noted; initial vital signs: T 36.2 °C, PR 142 bpm, RR 45 breaths/min.",
                     action: "Monitored and recorded vital signs; rewrapped newborn properly in fresh new warm blanket and bonnet; encouraged skin-to-skin contact with mother, educated mother in maintaining newborn warmth and avoiding overexposure during care; adjusted room temperature to 24 °C.",
                     response: "Newborn temperature remained at normal range, showed no signs of hypothermia; mother verbalized understanding of maintaining newborn warmth and avoiding overexposure; latest vital signs: T 36.7 °C, PR 138 bpm, RR 44 breaths/min."
                  },
                  {
                     date: "2026-04-15", time: "06:00 PM", shift: "PM",
                     focus: "Risk for Infection",
                     data: "Received newborn rooming-in with mother, handling by caregivers observed; skin soft, delicate, and dry; umbilical cord stump present, moist and freshly clamped; no fever noted; no redness noted.",
                     action: "Performed proper hand hygiene before and after handling newborn; monitored and recorded vital signs; maintained aseptic technique during cord care; encouraged early breastfeeding to enhance immunity; provided health teaching to the mother and caregivers on proper cord care.",
                     response: "Mother and caregivers verbalized understanding on provided health teaching; newborn stable; latest vital signs: T 36.4 °C, PR 140 bpm, RR 46 breaths/min."
                  },
                  {
                     date: "2026-04-16", time: "02:00 PM", shift: "AM",
                     focus: "Discharge Planning",
                     data: "Received newborn rooming-in with mother, lying in bed; newborn stable, alert, and feeding well; umbilical cord stump dry and clean, no signs of infection noted; no complications noted during hospital stay.",
                     action: "Monitored and recorded vital signs; NPI established; provided health teaching to the mother regarding newborn discharge care including: proper umbilical cord care, feeding cues and importance of breastfeeding, maintaining warmth and appropriate clothing, recognizing danger signs, and follow-up checkups and immunization schedule.",
                     response: "Mother verbalized understanding of discharge instructions and newborn care; newborn remained stable with latest vital signs: T 36.8 °C, PR 136 bpm, RR 42 breaths/min; discharged at 2:45 PM."
                  }
               ]
            }
          }
        ]
      }
    }
  });

  console.log("Seeding complete:");
  console.log("- Patient 1:", patient1.admissionNumber);
  console.log("- Patient 2:", patient2.admissionNumber, "- Newborn ID:", patient2.id);

  await prisma.$disconnect();
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
