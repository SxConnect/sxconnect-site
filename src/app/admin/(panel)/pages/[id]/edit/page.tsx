import Link from "next/link";
import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { PageForm } from "../../PageForm";
import { SectionForm } from "../../SectionForm";
import { createSection } from "@/lib/actions/sections";

export const dynamic = "force-dynamic";

export default async function EditPagePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const page = await prisma.page.findUnique({
    where: { id },
    include: { sections: { orderBy: { sectionOrder: "asc" } } },
  });
  if (!page) notFound();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Editar página</h1>
        <Link href="/admin/pages" className="text-blue-600 hover:underline">
          ← Voltar
        </Link>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold">Dados da página</h2>
        <PageForm page={page} />
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Seções</h2>
          <form action={createSection.bind(null, page.id)}>
            <button type="submit" className="btn btn-primary text-xs">
              Adicionar seção
            </button>
          </form>
        </div>

        {page.sections.length === 0 ? (
          <p className="text-gray-500">Nenhuma seção. O conteúdo da página (acima) será usado.</p>
        ) : (
          <div className="space-y-4">
            {page.sections.map((section) => (
              <SectionForm key={section.id} section={section} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
