"use client";

import { useState } from "react";

export default function RichTextEditor({
  name,
  label,
  defaultValue = "",
}: {
  name: string;
  label: string;
  defaultValue?: string;
}) {
  const [mode, setMode] = useState<"preview" | "html">("preview");
  const [html, setHtml] = useState(defaultValue);

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <label className="block text-sm font-medium">{label}</label>
        <div className="flex gap-2 text-sm">
          <button
            type="button"
            onClick={() => setMode("preview")}
            className={`rounded px-2 py-1 ${mode === "preview" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
          >
            Visualizar
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

      {mode === "preview" ? (
        <iframe
          srcDoc={html}
          className="min-h-[400px] w-full rounded border border-gray-300 bg-white"
          sandbox="allow-same-origin"
          title="Preview"
        />
      ) : (
        <textarea
          className="input font-mono text-sm"
          rows={18}
          value={html}
          onChange={(e) => setHtml(e.target.value)}
        />
      )}

      <input type="hidden" name={name} value={html} />
    </div>
  );
}
