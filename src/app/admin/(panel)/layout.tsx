import { requireAdmin } from "@/lib/auth/guard";
import { logoutAction } from "@/lib/auth/actions";
import Link from "next/link";

export default async function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireAdmin();

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-6">
            <Link href="/admin" className="font-bold">
              CMS Admin
            </Link>
            <nav className="flex gap-4 text-sm">
              <Link href="/admin/posts" className="hover:underline">
                Posts
              </Link>
              <Link href="/admin/pages" className="hover:underline">
                Páginas
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span className="text-gray-500">{user.email}</span>
            <form action={logoutAction}>
              <button type="submit" className="btn btn-danger text-xs">
                Sair
              </button>
            </form>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>
    </div>
  );
}
