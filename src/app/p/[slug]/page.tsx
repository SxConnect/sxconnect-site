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
  const page = await prisma.page.findUnique({ where: { slug } });
  if (!page || !page.published) notFound();

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-3xl font-bold">{page.title}</h1>
      <article className="prose mt-6 max-w-none whitespace-pre-wrap">
        {page.content}
      </article>
      <div className="mt-8">
        <Link href="/" className="text-blue-600 hover:underline">
          ← Home
        </Link>
      </div>
    </main>
  );
}
