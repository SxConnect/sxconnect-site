"use server";

import { prisma } from "@/lib/prisma";

export async function createMediaFromFile(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const data = Buffer.from(arrayBuffer);
  const media = await prisma.media.create({
    data: {
      filename: file.name || "upload",
      mimeType: file.type || "application/octet-stream",
      data,
      size: data.length,
    },
  });
  return media.id;
}
