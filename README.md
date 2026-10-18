# SxConnect CMS

CMS básico em Next.js + Prisma + PostgreSQL, pronto para Vercel + Neon e portável para VPS.

## Funcionalidades
- Login de administrador
- CRUD de posts (blog/notícias) com imagem de capa salva no banco
- CRUD de páginas publicadas com opção de aparecer no menu
- Site público renderizado a partir do banco

## Desenvolvimento local

```bash
cp .env.example .env
# edite DATABASE_URL
npm install
npm run db:deploy
npm run db:seed
npm run dev
```

## Deploy na Vercel

1. Crie um banco no Neon e copie a `DATABASE_URL`.
2. No projeto da Vercel, configure as variáveis:
   - `DATABASE_URL`
   - `ADMIN_EMAIL`
   - `ADMIN_PASSWORD`
   - `ADMIN_NAME` (opcional)
3. Use o comando de build: `npm run vercel-build` (ou deixe a Vercel detectar).
4. Após o primeiro deploy, rode o seed uma vez (localmente com a `DATABASE_URL` do Neon):
   ```bash
   npm run db:seed
   ```

## Migração para VPS

O projeto é um app Next.js padrão. Em uma VPS, use:

```bash
npm ci
npm run build
npm run start
```

com `DATABASE_URL` apontando para seu PostgreSQL. Imagens ficam no banco, então não há dependência de filesystem.
