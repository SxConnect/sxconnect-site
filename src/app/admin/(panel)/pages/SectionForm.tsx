"use client";

import { useActionState } from "react";
import Link from "next/link";

import { saveSection, deleteSection } from "@/lib/actions/sections";
import RichTextEditor from "@/components/RichTextEditor";

type Section = {
  id: string;
  pageId: string;
  title: string | null;
  content: string;
  visible: boolean;
  sectionOrder: number;
};

export function SectionForm({ section }: { section: Section }) {
  const [state, action, pending] = useActionState(saveSection, null);

  return (
    <div className="card space-y-4" id={`section-${section.id}`}>
      <form action={action} className="space-y-4">
        <input type="hidden" name="id" value={section.id} />
        <input type="hidden" name="pageId" value={section.pageId} />
        <div>
          <label className="mb-1 block text-sm font-medium">Título da seção (opcional)</label>
          <input name="title" className="input" defaultValue={section.title ?? ""} />
        </div>
        <RichTextEditor name="content" label="Conteúdo da seção" defaultValue={section.content} />
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <input name="visible" type="checkbox" id={`visible-${section.id}`} defaultChecked={section.visible} />
            <label htmlFor={`visible-${section.id}`} className="text-sm">
              Visível
            </label>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Ordem</label>
            <input name="sectionOrder" type="number" className="input" defaultValue={section.sectionOrder} />
          </div>
        </div>
        {state?.error && <p className="text-sm text-red-600">{state.error}</p>}
        <button type="submit" className="btn btn-primary" disabled={pending}>
          {pending ? "Salvando..." : "Salvar seção"}
        </button>
      </form>
      <form action={deleteSection.bind(null, section.id, section.pageId)} className="pt-2">
        <button type="submit" className="btn btn-danger text-xs">
          Excluir seção
        </button>
      </form>
    </div>
  );
}
