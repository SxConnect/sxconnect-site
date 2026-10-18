"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth/guard";

export async function createSection(pageId: string) {
  await requireAdmin();
  const section = await prisma.section.create({
    data: { pageId, content: "<p>Nova seção</p>", sectionOrder: 999 },
  });
  revalidatePath(`/admin/pages/${pageId}/edit`);
  redirect(`/admin/pages/${pageId}/edit#section-${section.id}`);
}

export async function saveSection(
  _prev: { error?: string } | null,
  formData: FormData,
): Promise<{ error?: string } | null> {
  await requireAdmin();

  const id = String(formData.get("id") ?? "").trim() || undefined;
  const pageId = String(formData.get("pageId") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();
  const visible = formData.get("visible") === "on";
  const sectionOrder = Number(formData.get("sectionOrder") ?? 0) || 0;

  if (!pageId || !content) {
    return { error: "Página e conteúdo são obrigatórios." };
  }

  const data = {
    pageId,
    title: title || null,
    content,
    visible,
    sectionOrder,
  };

  if (id) {
    await prisma.section.update({ where: { id }, data });
  } else {
    await prisma.section.create({ data });
  }

  revalidatePath("/");
  revalidatePath("/admin/pages");
  if (id) redirect(`/admin/pages/${pageId}/edit`);
  redirect(`/admin/pages/${pageId}/edit`);
}

export async function deleteSection(id: string, pageId: string) {
  await requireAdmin();
  await prisma.section.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/pages");
  redirect(`/admin/pages/${pageId}/edit`);
}
