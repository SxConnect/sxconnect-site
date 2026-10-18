import "dotenv/config";
import fs from "node:fs";
import path from "node:path";

import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";
import bcrypt from "bcryptjs";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL não definida");
}

const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString }) });

async function main() {
  const email = (process.env.ADMIN_EMAIL || "sxconect@gmail.com").toLowerCase();
  const password = process.env.ADMIN_PASSWORD || "Sx@170805";
  const name = process.env.ADMIN_NAME || "Administrador";

  const passwordHash = await bcrypt.hash(password, 10);

  await prisma.user.upsert({
    where: { email },
    update: { name, passwordHash, role: "ADMIN" },
    create: { email, name, passwordHash, role: "ADMIN" },
  });
  console.log(`Admin upserted: ${email}`);

  let landingHtml = "<h1>SxConnect</h1>";
  const landingPath = path.join(process.cwd(), "legacy", "index-cms.html");
  if (fs.existsSync(landingPath)) {
    landingHtml = fs.readFileSync(landingPath, "utf-8");
  }

  const homePage = await prisma.page.upsert({
    where: { slug: "home" },
    update: { title: "Página inicial", published: true, showInMenu: false },
    create: { title: "Página inicial", slug: "home", content: "", published: true, showInMenu: false },
  });

  const sectionCount = await prisma.section.count({ where: { pageId: homePage.id } });
  if (sectionCount === 0) {
    await prisma.section.create({
      data: { pageId: homePage.id, title: "Landing", content: landingHtml, sectionOrder: 0, visible: true },
    });
  }
  console.log("Página inicial upserted.");

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
