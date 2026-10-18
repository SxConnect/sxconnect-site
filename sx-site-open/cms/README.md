# SxConnect CMS

Sistema de gerenciamento de conteúdo para o site institucional da SxConnect.

## Stack

- **Backend:** Node.js + Express
- **Banco:** MariaDB/MySQL
- **Frontend:** HTML/CSS/JS + Tailwind CSS
- **Templates:** EJS

## Requisitos

- Node.js 18+
- MySQL ou MariaDB
- Docker (opcional)

## Instalação manual

```bash
# 1. Instalar dependencias
npm install

# 2. Configurar variaveis de ambiente
cp .env.example .env
# Edite .env com as configuracoes do seu banco

# 3. Criar o banco de dados
mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS sxconnect_cms"

# 4. Iniciar
npm start
```

Acessar:
- Site: http://localhost:3000
- Admin: http://localhost:3000/admin
- Login: admin@sxconnect.com.br / Admin@123

## Docker

```bash
docker compose up -d
```

## Portainer

Importe o arquivo `stack-portainer.yml` como stack no Portainer.

## Estrutura

```
cms/
  app.js              - Entry point
  config/             - Configuracoes e migrations
  controllers/        - Logica das rotas
  middleware/         - Auth e upload
  models/             - Models do banco
  routes/             - Rotas web e admin
  views/              - Templates EJS
    admin/            - Painel administrativo
    site/             - Site publico
    partials/         - Componentes reutilizaveis
  public/
    uploads/          - Uploads de imagens
  seed/
    seed.js           - Dados iniciais
```

## Funcionalidades

- Gerenciamento de paginas (criar, editar, excluir, mostrar no menu)
- Gerenciamento de secoes da home (hero, texto, cards, grid, planos, noticias, CTA)
- Gerenciamento de noticias/blog com categorias e tags
- Gerenciamento de solucoes/produtos
- Gerenciamento do menu com dropdown
- Configuracoes do site
- Painel admin com autenticacao
- Site publico renderizado dinamicamente a partir do CMS
