import Link from "next/link";

import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [posts, pages] = await Promise.all([
    prisma.post.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
      take: 20,
      include: { coverImage: true },
    }),
    prisma.page.findMany({
      where: { published: true, showInMenu: true },
      orderBy: { menuOrder: "asc" },
    }),
  ]);

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <header className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold">SxConnect</h1>
        <nav className="flex gap-4 text-sm">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          {pages.map((p) => (
            <Link key={p.id} href={`/p/${p.slug}`} className="hover:underline">
              {p.title}
            </Link>
          ))}
          <Link href="/blog" className="hover:underline">
            Blog
          </Link>
          <Link href="/admin" className="hover:underline">
            Admin
          </Link>
        </nav>
      </header>

      <section className="mb-10">
        <h2 className="mb-4 text-xl font-semibold">Últimas notícias</h2>
        {posts.length === 0 ? (
          <p className="text-gray-500">Nenhuma notícia publicada ainda.</p>
        ) : (
          <ul className="grid gap-6 sm:grid-cols-2">
            {posts.map((post) => (
              <li key={post.id} className="card">
                {post.coverImageId && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={`/api/media/${post.coverImageId}`}
                    alt={post.title}
                    className="mb-3 h-40 w-full rounded object-cover"
                  />
                )}
                <h3 className="text-lg font-semibold">
                  <Link href={`/blog/${post.slug}`} className="hover:underline">
                    {post.title}
                  </Link>
                </h3>
                {post.excerpt && (
                  <p className="mt-1 text-sm text-gray-600">{post.excerpt}</p>
                )}
                <p className="mt-2 text-xs text-gray-400">
                  {new Date(post.createdAt).toLocaleDateString("pt-BR")}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
