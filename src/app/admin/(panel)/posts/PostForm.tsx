"use client";

import { useActionState } from "react";
import Link from "next/link";

import { savePost } from "@/lib/actions/posts";
import RichTextEditor from "@/components/RichTextEditor";

type Post = {
  id: string;
  title: string;
  excerpt: string | null;
  content: string;
  published: boolean;
  coverImageId: string | null;
};

export function PostForm({ post }: { post?: Post }) {
  const [state, action, pending] = useActionState(savePost, null);

  return (
    <form action={action} className="card space-y-4" encType="multipart/form-data">
      {post && <input type="hidden" name="id" value={post.id} />}
      <div>
        <label className="mb-1 block text-sm font-medium">Título</label>
        <input name="title" className="input" defaultValue={post?.title ?? ""} required />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">Resumo</label>
        <input name="excerpt" className="input" defaultValue={post?.excerpt ?? ""} />
      </div>
      <RichTextEditor name="content" label="Conteúdo" defaultValue={post?.content ?? ""} />
      <div>
        <label className="mb-1 block text-sm font-medium">Imagem de capa</label>
        {post?.coverImageId && (
          <div className="mb-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`/api/media/${post.coverImageId}`} alt="capa" className="h-32 rounded object-cover" />
          </div>
        )}
        <input name="cover" type="file" accept="image/*" className="input" />
      </div>
      <div className="flex items-center gap-2">
        <input name="published" type="checkbox" id="published" defaultChecked={post?.published ?? false} />
        <label htmlFor="published" className="text-sm">
          Publicado
        </label>
      </div>
      {state?.error && <p className="text-sm text-red-600">{state.error}</p>}
      <div className="flex gap-2">
        <button type="submit" className="btn btn-primary" disabled={pending}>
          {pending ? "Salvando..." : "Salvar"}
        </button>
        <Link href="/admin/posts" className="btn">
          Cancelar
        </Link>
      </div>
    </form>
  );
}
