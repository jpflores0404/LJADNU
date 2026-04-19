"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createNewbornRecord(formData: FormData) {
  const data = Object.fromEntries(formData.entries());
  
  const newborn = await prisma.newbornRecord.create({
    data: {
      maternalPatientId: data.maternalPatientId as string,
      name: data.name as string,
      gender: data.gender as string,
      dateOfBirth: new Date(data.dateOfBirth as string),
      timeOfBirth: data.timeOfBirth as string,
      mannerOfDelivery: data.mannerOfDelivery as string,
      icdCode: (data.icdCode as string) || "Z38.0",
      admissionDiagnosis: data.admissionDiagnosis as string,
      finalDiagnosis: (data.finalDiagnosis as string) || null,
      weight: parseFloat(data.weight as string) || 0,
      length: parseFloat(data.length as string) || 0,
      headCircumference: parseFloat(data.headCircumference as string) || 0,
      chestCircumference: parseFloat(data.chestCircumference as string) || 0,
      abdominalCircumference: parseFloat(data.abdominalCircumference as string) || 0,
    },
  });

  revalidatePath("/newborn");
  revalidatePath(`/maternal/${data.maternalPatientId}`);
  redirect(`/newborn/${newborn.id}`);
}

export async function updateNewbornRecord(formData: FormData) {
  const data = Object.fromEntries(formData.entries());
  const id = data.id as string;

  await prisma.newbornRecord.update({
    where: { id },
    data: {
      name: data.name as string,
      gender: data.gender as string,
      dateOfBirth: new Date(data.dateOfBirth as string),
      timeOfBirth: data.timeOfBirth as string,
      mannerOfDelivery: data.mannerOfDelivery as string,
      icdCode: (data.icdCode as string) || "Z38.0",
      admissionDiagnosis: data.admissionDiagnosis as string,
      finalDiagnosis: (data.finalDiagnosis as string) || null,
      weight: parseFloat(data.weight as string) || 0,
      length: parseFloat(data.length as string) || 0,
      headCircumference: parseFloat(data.headCircumference as string) || 0,
      chestCircumference: parseFloat(data.chestCircumference as string) || 0,
      abdominalCircumference: parseFloat(data.abdominalCircumference as string) || 0,
    },
  });

  revalidatePath("/newborn");
  revalidatePath(`/newborn/${id}`);
  redirect(`/newborn/${id}`);
}

export async function deleteNewbornRecord(id: string) {
  const nb = await prisma.newbornRecord.findUnique({ where: { id } });
  await prisma.newbornRecord.delete({ where: { id } });
  revalidatePath("/newborn");
  if (nb) revalidatePath(`/maternal/${nb.maternalPatientId}`);
  redirect("/newborn");
}
