import Link from "next/link";
import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await prisma.post.findUnique({
    where: { slug },
    include: { coverImage: true },
  });

  if (!post || !post.published) notFound();

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <Link href="/blog" className="text-sm text-blue-600 hover:underline">
        ← Blog
      </Link>
      <h1 className="mt-4 text-3xl font-bold">{post.title}</h1>
      <p className="mt-1 text-sm text-gray-400">
        {new Date(post.createdAt).toLocaleDateString("pt-BR")}
      </p>
      {post.coverImageId && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={`/api/media/${post.coverImageId}`}
          alt={post.title}
          className="my-6 h-auto w-full rounded"
        />
      )}
      {post.excerpt && (
        <p className="my-4 text-lg text-gray-600">{post.excerpt}</p>
      )}
      <article className="prose max-w-none whitespace-pre-wrap">
        {post.content}
      </article>
    </main>
  );
}
