import "dotenv/config";

import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";
import bcrypt from "bcryptjs";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL não definida");
}

const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString }) });

async function main() {
  const email = (process.env.ADMIN_EMAIL || "admin@sxconnect.com.br").toLowerCase();
  const password = process.env.ADMIN_PASSWORD || "Admin@123";
  const name = process.env.ADMIN_NAME || "Administrador";

  const existing = await prisma.user.findUnique({ where: { email } });
  if (!existing) {
    const passwordHash = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: { email, name, passwordHash, role: "ADMIN" },
    });
    console.log(`Admin criado: ${email}`);
  } else {
    console.log(`Admin já existe: ${email}`);
  }

  // Página inicial de exemplo
  const homeSlug = "sobre";
  const hasPage = await prisma.page.findUnique({ where: { slug: homeSlug } });
  if (!hasPage) {
    await prisma.page.create({
      data: {
        title: "Sobre",
        slug: homeSlug,
        content: "Página sobre a SxConnect.",
        published: true,
        showInMenu: true,
        menuOrder: 1,
      },
    });
  }

  // Post de exemplo
  const postSlug = "bem-vindo-ao-cms";
  const hasPost = await prisma.post.findUnique({ where: { slug: postSlug } });
  if (!hasPost) {
    await prisma.post.create({
      data: {
        title: "Bem-vindo ao CMS",
        slug: postSlug,
        excerpt: "Primeiro post do CMS SxConnect.",
        content: "Este é o primeiro post publicado no novo CMS.",
        published: true,
      },
    });
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
