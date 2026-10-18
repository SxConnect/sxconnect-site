import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  const page = await prisma.page.findUnique({
    where: { slug: "home" },
    include: { sections: { where: { visible: true }, orderBy: { sectionOrder: "asc" } } },
  });

  if (page && page.published) {
    const html =
      page.sections.length > 0
        ? page.sections.map((s) => s.content).join("\n")
        : page.content;
    return new NextResponse(html, {
      status: 200,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  }

  return new NextResponse(
    "<!DOCTYPE html><html><body><h1>SxConnect</h1><p>Página inicial não configurada.</p></body></html>",
    { status: 200, headers: { "Content-Type": "text/html; charset=utf-8" } },
  );
}
