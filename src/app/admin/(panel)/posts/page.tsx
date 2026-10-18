import Link from "next/link";

import { prisma } from "@/lib/prisma";
import { deletePost } from "@/lib/actions/posts";

export const dynamic = "force-dynamic";

export default async function PostsListPage() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Posts</h1>
        <Link href="/admin/posts/new" className="btn btn-primary">
          Novo post
        </Link>
      </div>

      {posts.length === 0 ? (
        <p className="text-gray-500">Nenhum post.</p>
      ) : (
        <div className="space-y-2">
          {posts.map((post) => (
            <div key={post.id} className="card flex items-center justify-between">
              <div>
                <Link
                  href={`/admin/posts/${post.id}/edit`}
                  className="font-semibold hover:underline"
                >
                  {post.title}
                </Link>
                <span
                  className={`ml-2 rounded px-2 py-0.5 text-xs ${
                    post.published
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {post.published ? "publicado" : "rascunho"}
                </span>
              </div>
              <form action={deletePost.bind(null, post.id)}>
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
