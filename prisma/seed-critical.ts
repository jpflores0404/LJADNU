import { PrismaClient } from "@prisma/client";

async function main() {
  const prisma = new PrismaClient();

  // ═══════════════════════════════════════════════════════════════════════════
  // CRITICAL MATERNAL PATIENT — Severe Preeclampsia
  // ═══════════════════════════════════════════════════════════════════════════
  const criticalMother = await prisma.maternalPatient.create({
    data: {
      admissionNumber: "ADM-2026-CRIT-001",
      bedNumber: "ICU-1",
      lastName: "Reyes",
      firstName: "Ana Sofia",
      middleName: "Villanueva",
      age: 34,
      gender: "Female",
      civilStatus: "Married",
      address: "45 Rizal Ave, Brgy. Poblacion, Naga City, Camarines Sur",
      religion: "Roman Catholic",
      dateOfBirth: new Date("1992-03-12"),
      placeOfBirth: "Naga City",
      nationality: "Filipino",
      occupation: "Teacher",
      contactNumber: "09171234567",

      // Emergency Contact
      husbandName: "Roberto C. Reyes",
      husbandOccupation: "Engineer",
      companionName: "Roberto C. Reyes",
      companionRelation: "Husband",
      companionContact: "09187654321",

      // Admission Info
      dateAdmitted: new Date("2026-05-10T14:30:00"),
      timeAdmitted: "02:30 PM",
      admittedBy: "RN. Fernandez",
      attendingPhysician: "Dr. Elena Rodriguez, OB-GYN",

      // Diagnosis
      admittingDiagnosis: "G3P2 Pregnancy, 36 weeks AOG, Severe Preeclampsia with impending eclampsia",

      // OB History (GTPAL)
      gravida: 3,
      term: 2,
      preterm: 0,
      abortion: 0,
      living: 2,
      lmp: new Date("2025-09-01"),
      edc: new Date("2026-06-08"),
      aog: "36 weeks",
      bow: "(+)",
      allergy: "Penicillin",
      preExistingIllness: "Gestational Hypertension (previous pregnancy)",

      // Physical Examination
      generalAppearance: "Restless, anxious, appears ill",
      pallor: "N",
      pale: "None",
      sunkenEye: "N",
      edema: "Severe — pitting edema bilateral lower extremities, facial puffiness",

      // Baseline Vitals (CRITICAL)
      temperature: "38.2°C",
      bloodPressure: "180/120 mmHg",
      respiratoryRate: "28 bpm",
      pulseRate: "128 bpm",

      fundalHeight: "34 cm",
      fetalHeartTone: "110 bpm — intermittent late decelerations",
      internalExam: "Cervix 2cm dilated, 50% effaced",

      status: "Active",

      // ─── VITAL SIGNS (progressively critical) ──────────────────────────
      vitalSigns: {
        create: [
          // Most recent first (ordered by createdAt desc in queries)
          { date: "2026-05-11", time: "06:00 AM", bloodPressure: "175/115", pulseRate: "130", respiratoryRate: "26", temperature: "38.3", signature: "RN. Fernandez" },
          { date: "2026-05-11", time: "02:00 AM", bloodPressure: "170/112", pulseRate: "126", respiratoryRate: "25", temperature: "38.1", signature: "RN. Santos" },
          { date: "2026-05-10", time: "10:00 PM", bloodPressure: "168/110", pulseRate: "124", respiratoryRate: "24", temperature: "38.0", signature: "RN. Santos" },
          { date: "2026-05-10", time: "06:00 PM", bloodPressure: "165/108", pulseRate: "122", respiratoryRate: "23", temperature: "37.9", signature: "RN. Fernandez" },
          { date: "2026-05-10", time: "02:30 PM", bloodPressure: "180/120", pulseRate: "128", respiratoryRate: "28", temperature: "38.2", signature: "RN. Fernandez" },
        ]
      },

      // ─── MEDICATIONS (emergency treatment) ─────────────────────────────
      medications: {
        create: [
          { medicationName: "Magnesium Sulfate 4g IV Loading Dose", dateGiven: "2026-05-10", timeGiven: "02:45 PM", route: "IV", givenBy: "RN. Fernandez" },
          { medicationName: "Magnesium Sulfate 1g/hr IV Maintenance", dateGiven: "2026-05-10", timeGiven: "03:00 PM", route: "IV Drip", givenBy: "RN. Fernandez" },
          { medicationName: "Hydralazine 5mg IV", dateGiven: "2026-05-10", timeGiven: "03:15 PM", route: "IV", givenBy: "RN. Santos" },
          { medicationName: "Hydralazine 5mg IV (2nd dose)", dateGiven: "2026-05-10", timeGiven: "06:30 PM", route: "IV", givenBy: "RN. Santos" },
          { medicationName: "Dexamethasone 6mg IM (Fetal Lung Maturity)", dateGiven: "2026-05-10", timeGiven: "03:30 PM", route: "IM", givenBy: "RN. Fernandez" },
          { medicationName: "Dexamethasone 6mg IM (2nd dose)", dateGiven: "2026-05-11", timeGiven: "03:30 AM", route: "IM", givenBy: "RN. Santos" },
        ]
      },

      // ─── NURSE NOTES (FDAR — documenting critical events) ──────────────
      nurseNotes: {
        create: [
          {
            date: "2026-05-10", time: "02:30 PM", shift: "PM",
            focus: "Severe Preeclampsia — Admission Assessment",
            data: "34 y/o G3P2 patient admitted at 36 weeks AOG via ER; chief complaint: persistent severe headache, blurring of vision, and epigastric pain for 6 hours; patient had previous gestational hypertension in 2nd pregnancy; BP upon admission 180/120 mmHg, PR 128 bpm, RR 28 cpm, T 38.2°C; severe pitting edema bilateral lower extremities and facial puffiness noted; deep tendon reflexes hyperactive (+3); protein in urine 3+; FHT 110 bpm with intermittent late decelerations on NST.",
            action: "Placed on continuous electronic fetal monitoring; secured two large-bore IV lines — D5LR 1L started on left arm; initiated MgSO4 loading dose 4g IV over 20 min as ordered; strict seizure precautions implemented — side rails up, padded, suction at bedside, tongue blade; placed patient on left lateral recumbent position; Foley catheter inserted for strict I&O monitoring (output currently 30 mL/hr); stat labs drawn — CBC, BUN/Crea, LFTs, coagulation profile, uric acid; referred to Dr. Rodriguez for evaluation of emergency CS delivery.",
            response: "Patient verbalized understanding of condition; remains restless with persistent headache rated 8/10; BP slightly decreased to 168/110 after MgSO4 loading; FHR baseline stabilized at 120 bpm; Dr. Rodriguez at bedside evaluating for possible emergency cesarean delivery within 12-24 hours."
          },
          {
            date: "2026-05-10", time: "06:00 PM", shift: "PM",
            focus: "Seizure Risk — Ongoing Monitoring",
            data: "Patient still reports severe headache (7/10) and visual disturbances (seeing spots); BP 165/108, PR 122, RR 23, T 37.9°C; deep tendon reflexes remain hyperactive (+3); urine output 35 mL/hr via Foley; MgSO4 maintenance infusion running at 1g/hr; magnesium level result: 4.8 mEq/L (therapeutic range 4-7); patellar reflexes present.",
            action: "Continued seizure precautions; administered Hydralazine 5mg IV push as ordered for sustained hypertension; continued strict I&O monitoring; performed neuro checks q1h — level of consciousness, visual changes, headache severity, DTRs, clonus; provided dim lighting and minimal stimulation; restricted visitors; educated husband on danger signs to report immediately; fetal monitoring continued — reassuring tracing at present.",
            response: "BP decreased to 155/100 after Hydralazine dose; headache reduced to 6/10; visual disturbances persist but patient denies worsening; fetal tracing showing good variability; husband verbalized understanding of danger signs."
          },
          {
            date: "2026-05-11", time: "02:00 AM", shift: "NOC",
            focus: "Worsening Hypertension — Escalation of Care",
            data: "Patient awakened by severe headache (9/10), reports return of epigastric pain; BP spiked to 170/112, PR 126, RR 25, T 38.1°C; urine output decreased to 25 mL/hr (was 35 mL/hr); protein in urine remains at 3+; patient appears more agitated; lab results show elevated LFTs (AST 85, ALT 92), platelets dropping (150,000 — was 180,000 on admission); magnesium level 5.2 mEq/L.",
            action: "Immediately notified Dr. Rodriguez of deteriorating clinical status and declining labs suggestive of HELLP syndrome; maintained seizure precautions; increased monitoring frequency to q30min vital signs; prepared blood products standby (2 units PRBC cross-matched); continued MgSO4 infusion; Dexamethasone 2nd dose administered IM as scheduled; Dr. Rodriguez ordered emergency CS for 0800 pending OR availability and anesthesia consultation.",
            response: "Dr. Rodriguez confirmed emergency CS scheduled for 08:00 AM today; anesthesia team consulted and plans for general anesthesia due to coagulopathy risk; patient and husband counseled about surgery — consent signed; patient remains anxious but cooperative; current BP 170/112 despite treatment — refractory hypertension documented."
          }
        ]
      },

      // ─── PHYSICIAN ORDERS ─────────────────────────────────────────────
      physicianOrders: {
        create: [
          {
            date: "2026-05-10",
            notes: "ADMIT to OB-ICU\nDiagnosis: Severe Preeclampsia, G3P2, 36 weeks AOG\n\n1. Complete bed rest, LEFT LATERAL position\n2. NPO until further orders\n3. Start IV D5LR 1L at 120cc/hr\n4. MgSO4 4g IV loading dose over 20 min, then 1g/hr IV maintenance\n5. Monitor patellar reflexes, RR, and urine output q1h\n6. Hydralazine 5mg IV push if SBP ≥ 160 or DBP ≥ 110, may repeat in 20 min (max 20mg)\n7. Dexamethasone 6mg IM q12h × 4 doses (fetal lung maturity)\n8. Insert Foley catheter — strict I&O\n9. Continuous fetal monitoring\n10. STRICT SEIZURE PRECAUTIONS\n11. Stat labs: CBC, BUN/Crea, LFTs, Coagulation Profile, Uric Acid, Urinalysis\n12. Cross-match 2 units PRBC\n13. Restrict visitors, dim lights, minimize stimulation\n14. Call immediately if: seizures, decreased LOC, UO < 30mL/hr, worsening headache/vision"
          },
          {
            date: "2026-05-11",
            notes: "EMERGENCY CS scheduled 08:00 AM\nIndication: Severe Preeclampsia with features of HELLP syndrome, refractory hypertension, fetal distress\n\n1. Consent obtained and signed\n2. NPO strictly enforced from midnight\n3. Continue MgSO4 infusion through surgery and 24h post-op\n4. Anesthesia: General anesthesia — epidural contraindicated (platelet decline)\n5. Prep for surgery: shave, foley in place, blood products on standby\n6. Neonatology team to standby in OR for preterm infant\n7. Post-op monitoring in OB-ICU\n8. Repeat CBC, LFTs, coagulation profile at 06:00 AM pre-op"
          }
        ]
      },

      // ─── LAB RESULTS (showing critical values) ────────────────────────
      labResults: {
        create: [
          {
            datePerformed: "2026-05-10",
            remarks: "CRITICAL — Elevated liver enzymes, declining platelets suggestive of early HELLP syndrome. Proteinuria 3+. Uric acid elevated.",
            wbcCount: "12.5",
            rbcCount: "4.1",
            hemoglobin: "11.2",
            hematocrit: "34",
            plateletCount: "150000",
            neutrophils: "78",
            lymphocytes: "15",
            monocytes: "4",
            eosinophils: "2",
            basophils: "1",
            urineColor: "Dark Yellow",
            urineTransparency: "Cloudy",
            urineReaction: "Acidic",
            urinePH: "5.0",
            urineSpecificGravity: "1.030",
            urineGlucose: "Negative",
            urineProtein: "3+",
            urineWBC: "5-10/HPF",
            urineRBC: "2-5/HPF",
            bloodTypeABO: "O",
            bloodTypeRh: "Positive"
          }
        ]
      },

      // ─── OUTPUT CHART ──────────────────────────────────────────────────
      outputCharts: {
        create: [
          { date: "2026-05-10", shift: "PM", stoolCount: 0, urineCount: 1 },
          { date: "2026-05-11", shift: "NOC", stoolCount: 0, urineCount: 1 },
        ]
      },

      // ─── ULTRASOUND ────────────────────────────────────────────────────
      ultrasoundResults: {
        create: [
          {
            datePerformed: "2026-05-10",
            impression: "FINDINGS:\n- Single live intrauterine pregnancy in cephalic presentation\n- Estimated gestational age: 36 weeks 2 days\n- Estimated fetal weight: 2,450g (10th-25th percentile — slightly small for gestational age)\n- Amniotic fluid index: 6.2 cm (LOW — oligohydramnios)\n- Placental location: Posterior, Grade III maturity\n- Umbilical artery Doppler: Elevated S/D ratio of 3.8 (borderline abnormal)\n\nIMPRESSION:\n- IUGR suspected — fetal weight below expected for gestational age\n- Oligohydramnios — AFI 6.2 cm\n- Abnormal umbilical artery Doppler suggestive of placental insufficiency\n- Correlate clinically with maternal severe preeclampsia\n- Recommend delivery within 24-48 hours"
          }
        ]
      }
    }
  });

  console.log("✅ Critical patient seeded successfully:");
  console.log(`   Patient: ${criticalMother.firstName} ${criticalMother.lastName}`);
  console.log(`   Admission: ${criticalMother.admissionNumber}`);
  console.log(`   Bed: ${criticalMother.bedNumber}`);
  console.log(`   Diagnosis: ${criticalMother.admittingDiagnosis}`);
  console.log(`\n🚨 Critical vitals that will trigger alerts:`);
  console.log(`   BP: 175/115 (threshold: >160 systolic or >110 diastolic)`);
  console.log(`   PR: 130 bpm (threshold: >120)`);
  console.log(`   RR: 26 cpm (threshold: >24)`);
  console.log(`   Temp: 38.3°C (threshold: >38.0)`);

  await prisma.$disconnect();
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
