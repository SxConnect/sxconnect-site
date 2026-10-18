import Link from "next/link";
import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function PublicPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = await prisma.page.findUnique({
    where: { slug },
    include: { sections: { where: { visible: true }, orderBy: { sectionOrder: "asc" } } },
  });
  if (!page || !page.published) notFound();

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-3xl font-bold">{page.title}</h1>
      {page.sections.length > 0 ? (
        <div className="mt-6 space-y-8">
          {page.sections.map((section) => (
            <section key={section.id}>
              {section.title && <h2 className="text-xl font-semibold">{section.title}</h2>}
              <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: section.content }}
              />
            </section>
          ))}
        </div>
      ) : (
        <article className="prose mt-6 max-w-none whitespace-pre-wrap">
          {page.content}
        </article>
      )}
      <div className="mt-8">
        <Link href="/" className="text-blue-600 hover:underline">
          ← Home
        </Link>
      </div>
    </main>
  );
}
