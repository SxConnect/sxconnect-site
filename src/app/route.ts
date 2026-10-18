import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  const page = await prisma.page.findUnique({ where: { slug: "home" } });

  if (page && page.published) {
    return new NextResponse(page.content, {
      status: 200,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  }

  return new NextResponse(
    "<!DOCTYPE html><html><body><h1>SxConnect</h1><p>Página inicial não configurada.</p></body></html>",
    { status: 200, headers: { "Content-Type": "text/html; charset=utf-8" } },
  );
}
