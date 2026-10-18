"use client";

import { useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";

export default function RichTextEditor({
  name,
  label,
  defaultValue = "",
}: {
  name: string;
  label: string;
  defaultValue?: string;
}) {
  const [mode, setMode] = useState<"visual" | "html">("visual");
  const [html, setHtml] = useState(defaultValue);

  const editor = useEditor({
    extensions: [StarterKit, Image],
    content: defaultValue,
    onUpdate: ({ editor }) => {
      setHtml(editor.getHTML());
    },
  });

  useEffect(() => {
    if (mode === "visual" && editor) {
      editor.commands.setContent(html);
    }
  }, [mode]);

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <label className="block text-sm font-medium">{label}</label>
        <div className="flex gap-2 text-sm">
          <button
            type="button"
            onClick={() => setMode("visual")}
            className={`rounded px-2 py-1 ${mode === "visual" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
          >
            Visual
          </button>
          <button
            type="button"
            onClick={() => setMode("html")}
            className={`rounded px-2 py-1 ${mode === "html" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
          >
            HTML
          </button>
        </div>
      </div>

      {mode === "visual" ? (
        <div className="min-h-[200px] rounded border border-gray-300 p-2">
          <EditorContent editor={editor} />
        </div>
      ) : (
        <textarea
          className="input"
          rows={12}
          value={html}
          onChange={(e) => setHtml(e.target.value)}
        />
      )}

      <input type="hidden" name={name} value={html} />
    </div>
  );
}
