import "server-only";

import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/auth/session";

export async function requireAdmin() {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") {
    redirect("/admin/login");
  }
  return user;
}
