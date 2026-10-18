import Link from "next/link";
import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { PageForm } from "../../PageForm";

export const dynamic = "force-dynamic";

export default async function EditPagePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const page = await prisma.page.findUnique({ where: { id } });
  if (!page) notFound();

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Editar página</h1>
        <Link href="/admin/pages" className="text-blue-600 hover:underline">
          ← Voltar
        </Link>
      </div>
      <PageForm page={page} />
    </div>
  );
}
