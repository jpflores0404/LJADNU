"use server";

import { cookies } from "next/headers";

export async function loginAction(formData: FormData) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  if (username === "Nurse" && password === "123456") {
    const cookieStore = await cookies();
    cookieStore.set("auth", "authenticated", { path: "/", maxAge: 60 * 60 * 24 * 7 }); // 1 week
    return { success: true };
  } else {
    return { error: "Invalid username or password." };
  }
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("auth");
}
