import Link from "next/link";

import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
    include: { coverImage: true },
  });

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold">Blog</h1>
      {posts.length === 0 ? (
        <p className="text-gray-500">Nenhuma notícia publicada.</p>
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
              <h2 className="text-lg font-semibold">
                <Link href={`/blog/${post.slug}`} className="hover:underline">
                  {post.title}
                </Link>
              </h2>
              {post.excerpt && (
                <p className="mt-1 text-sm text-gray-600">{post.excerpt}</p>
              )}
            </li>
          ))}
        </ul>
      )}
      <div className="mt-6">
        <Link href="/" className="text-blue-600 hover:underline">
          ← Voltar
        </Link>
      </div>
    </main>
  );
}
