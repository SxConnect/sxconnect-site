import Link from "next/link";

import { prisma } from "@/lib/prisma";
import { deletePage } from "@/lib/actions/pages";

export const dynamic = "force-dynamic";

export default async function PagesListPage() {
  const pages = await prisma.page.findMany({
    orderBy: { menuOrder: "asc" },
  });

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Páginas</h1>
        <Link href="/admin/pages/new" className="btn btn-primary">
          Nova página
        </Link>
      </div>

      {pages.length === 0 ? (
        <p className="text-gray-500">Nenhuma página.</p>
      ) : (
        <div className="space-y-2">
          {pages.map((page) => (
            <div key={page.id} className="card flex items-center justify-between">
              <div>
                <Link
                  href={`/admin/pages/${page.id}/edit`}
                  className="font-semibold hover:underline"
                >
                  {page.title}
                </Link>
                <span className="ml-2 text-xs text-gray-500">/{page.slug}</span>
                {page.showInMenu && (
                  <span className="ml-2 rounded bg-blue-100 px-2 py-0.5 text-xs text-blue-700">
                    menu
                  </span>
                )}
              </div>
              <form action={deletePage.bind(null, page.id)}>
                <button type="submit" className="btn btn-danger text-xs">
                  Excluir
                </button>
              </form>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
