import Link from "next/link";

import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const [posts, pages] = await Promise.all([
    prisma.post.count(),
    prisma.page.count(),
  ]);

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Dashboard</h1>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="card">
          <p className="text-sm text-gray-500">Posts</p>
          <p className="text-3xl font-bold">{posts}</p>
          <Link href="/admin/posts" className="mt-2 inline-block text-blue-600 hover:underline">
            Gerenciar →
          </Link>
        </div>
        <div className="card">
          <p className="text-sm text-gray-500">Páginas</p>
          <p className="text-3xl font-bold">{pages}</p>
          <Link href="/admin/pages" className="mt-2 inline-block text-blue-600 hover:underline">
            Gerenciar →
          </Link>
        </div>
      </div>
    </div>
  );
}
