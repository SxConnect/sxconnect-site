"use server";

import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { createSession } from "@/lib/auth/session";
import { verifyPassword } from "@/lib/auth/password";

export async function loginAction(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: "Informe e-mail e senha." };
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || user.role !== "ADMIN") {
    return { error: "Credenciais inválidas." };
  }

  const ok = await verifyPassword(password, user.passwordHash);
  if (!ok) {
    return { error: "Credenciais inválidas." };
  }

  await createSession(user.id);
  redirect("/admin");
}

export async function logoutAction() {
  const { destroyCurrentSession } = await import("@/lib/auth/session");
  await destroyCurrentSession();
  redirect("/admin/login");
}
