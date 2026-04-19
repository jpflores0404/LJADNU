"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createMaternalRecord(formData: FormData) {
  const data = Object.fromEntries(formData.entries());

  const count = await prisma.maternalPatient.count();
  const year = new Date().getFullYear();
  const admissionNumber = `ADM-${year}-${String(count + 1).padStart(3, "0")}`;

  const patient = await prisma.maternalPatient.create({
    data: {
      admissionNumber,
      bedNumber: (data.bedNumber as string) || undefined,
      lastName: data.lastName as string,
      firstName: data.firstName as string,
      middleName: (data.middleName as string) || undefined,
      age: parseInt(data.age as string) || 0,
      gender: (data.gender as string) || "Female",
      civilStatus: data.civilStatus as string,
      address: data.address as string,
      religion: (data.religion as string) || undefined,
      dateOfBirth: new Date(data.dateOfBirth as string),
      placeOfBirth: (data.placeOfBirth as string) || undefined,
      nationality: (data.nationality as string) || "Filipino",
      occupation: (data.occupation as string) || undefined,
      employer: (data.employer as string) || undefined,
      
      philhealthNumber: (data.philhealthNumber as string) || undefined,
      philhealthStatus: (data.philhealthStatus as string) || undefined,
      philhealthMemberName: (data.philhealthMemberName as string) || undefined,
      philhealthMemberRelation: (data.philhealthMemberRelation as string) || undefined,
      philhealthMemberAddress: (data.philhealthMemberAddress as string) || undefined,
      philhealthMemberContact: (data.philhealthMemberContact as string) || undefined,
      
      husbandName: (data.husbandName as string) || undefined,
      husbandOccupation: (data.husbandOccupation as string) || undefined,
      husbandEmployer: (data.husbandEmployer as string) || undefined,
      contactNumber: data.contactNumber as string,
      fatherName: (data.fatherName as string) || undefined,
      fatherAddress: (data.fatherAddress as string) || undefined,
      motherName: (data.motherName as string) || undefined,
      motherAddress: (data.motherAddress as string) || undefined,
      companionName: (data.companionName as string) || undefined,
      companionRelation: (data.companionRelation as string) || undefined,
      companionContact: (data.companionContact as string) || undefined,
      companionAddress: (data.companionAddress as string) || undefined,
      
      dateAdmitted: data.dateAdmitted ? new Date(data.dateAdmitted as string) : new Date(),
      timeAdmitted: (data.timeAdmitted as string) || undefined,
      admittedBy: (data.admittedBy as string) || undefined,
      attendingPhysician: (data.attendingPhysician as string) || undefined,
      
      admittingDiagnosis: (data.admittingDiagnosis as string) || undefined,
      
      gravida: parseInt(data.gravida as string) || 0,
      term: parseInt(data.term as string) || 0,
      preterm: parseInt(data.preterm as string) || 0,
      abortion: parseInt(data.abortion as string) || 0,
      living: parseInt(data.living as string) || 0,
      
      lmp: data.lmp ? new Date(data.lmp as string) : undefined,
      edc: data.edc ? new Date(data.edc as string) : undefined,
      aog: (data.aog as string) || undefined,
      bow: (data.bow as string) || undefined,
      allergy: (data.allergy as string) || undefined,
      preExistingIllness: (data.preExistingIllness as string) || undefined,
      
      generalAppearance: (data.generalAppearance as string) || undefined,
      pallor: (data.pallor as string) || undefined,
      pale: (data.pale as string) || undefined,
      sunkenEye: (data.sunkenEye as string) || undefined,
      edema: (data.edema as string) || undefined,
      temperature: (data.temperature as string) || undefined,
      bloodPressure: (data.bloodPressure as string) || undefined,
      respiratoryRate: (data.respiratoryRate as string) || undefined,
      pulseRate: (data.pulseRate as string) || undefined,
      fundalHeight: (data.fundalHeight as string) || undefined,
      fetalHeartTone: (data.fetalHeartTone as string) || undefined,
      internalExam: (data.internalExam as string) || undefined,
    },
  });

  revalidatePath("/");
  revalidatePath("/maternal");
  redirect(`/maternal/${patient.id}`);
}

export async function updateMaternalRecord(formData: FormData) {
  const data = Object.fromEntries(formData.entries());
  const id = data.id as string;

  await prisma.maternalPatient.update({
    where: { id },
    data: {
      lastName: data.lastName as string,
      firstName: data.firstName as string,
      middleName: (data.middleName as string) || null,
      age: parseInt(data.age as string) || 0,
      civilStatus: data.civilStatus as string,
      address: data.address as string,
      religion: (data.religion as string) || null,
      dateOfBirth: new Date(data.dateOfBirth as string),
      placeOfBirth: (data.placeOfBirth as string) || null,
      bedNumber: (data.bedNumber as string) || null,
      nationality: (data.nationality as string) || "Filipino",
      occupation: (data.occupation as string) || null,
      employer: (data.employer as string) || null,
      
      philhealthNumber: (data.philhealthNumber as string) || null,
      philhealthStatus: (data.philhealthStatus as string) || null,
      philhealthMemberName: (data.philhealthMemberName as string) || null,
      philhealthMemberRelation: (data.philhealthMemberRelation as string) || null,
      philhealthMemberAddress: (data.philhealthMemberAddress as string) || null,
      philhealthMemberContact: (data.philhealthMemberContact as string) || null,
      
      husbandName: (data.husbandName as string) || null,
      husbandOccupation: (data.husbandOccupation as string) || null,
      husbandEmployer: (data.husbandEmployer as string) || null,
      contactNumber: data.contactNumber as string,
      fatherName: (data.fatherName as string) || null,
      fatherAddress: (data.fatherAddress as string) || null,
      motherName: (data.motherName as string) || null,
      motherAddress: (data.motherAddress as string) || null,
      companionName: (data.companionName as string) || null,
      companionRelation: (data.companionRelation as string) || null,
      companionContact: (data.companionContact as string) || null,
      companionAddress: (data.companionAddress as string) || null,
      
      attendingPhysician: (data.attendingPhysician as string) || null,
      dateAdmitted: data.dateAdmitted ? new Date(data.dateAdmitted as string) : undefined,
      timeAdmitted: (data.timeAdmitted as string) || null,
      admittedBy: (data.admittedBy as string) || null,
      dateDischarged: data.dateDischarged ? new Date(data.dateDischarged as string) : null,
      dischargedBy: (data.dischargedBy as string) || null,
      status: (data.status as string) || "Active",
      
      admittingDiagnosis: (data.admittingDiagnosis as string) || null,
      finalDiagnosis: (data.finalDiagnosis as string) || null,
      
      gravida: parseInt(data.gravida as string) || 0,
      term: parseInt(data.term as string) || 0,
      preterm: parseInt(data.preterm as string) || 0,
      abortion: parseInt(data.abortion as string) || 0,
      living: parseInt(data.living as string) || 0,
      
      lmp: data.lmp ? new Date(data.lmp as string) : null,
      edc: data.edc ? new Date(data.edc as string) : null,
      aog: (data.aog as string) || null,
      bow: (data.bow as string) || null,
      allergy: (data.allergy as string) || null,
      preExistingIllness: (data.preExistingIllness as string) || null,
      
      generalAppearance: (data.generalAppearance as string) || null,
      pallor: (data.pallor as string) || null,
      pale: (data.pale as string) || null,
      sunkenEye: (data.sunkenEye as string) || null,
      edema: (data.edema as string) || null,
      temperature: (data.temperature as string) || null,
      bloodPressure: (data.bloodPressure as string) || null,
      respiratoryRate: (data.respiratoryRate as string) || null,
      pulseRate: (data.pulseRate as string) || null,
      fundalHeight: (data.fundalHeight as string) || null,
      fetalHeartTone: (data.fetalHeartTone as string) || null,
      internalExam: (data.internalExam as string) || null,
    },
  });

  revalidatePath("/");
  revalidatePath("/maternal");
  revalidatePath(`/maternal/${id}`);
  redirect(`/maternal/${id}`);
}

export async function deleteMaternalRecord(id: string) {
  await prisma.maternalPatient.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/maternal");
  redirect("/maternal");
}
