# Prompt para OpenCode — CMS Site SxConnect

## Contexto
Construir o site institucional da SxConnect como um CMS completo, baseado nos arquivos existentes em `/home/silvano/Área de trabalho/SxConnect/Clientes/sxconnect-site/` e na imagem de referência `/home/silvano/Downloads/flixli.png`.

## Referências
- `sxconnect-home.html`: landing atual com seções navbar, hero, sobre, ANA, soluções, benefícios, CTA, footer.
- `site_SxConnect.md`: estrutura desejada do site e menu.
- `flixli.png`: inspiração para layout de notícias/blog.

## Objetivo
Criar um CMS onde o admin possa:
- Publicar textos/notícias
- Ter uma área de notícias na home
- Criar novas páginas
- Definir se a página aparece no menu ou não
- Criar novas seções na home

## Requisitos técnicos
- Stack: Node.js + Express + MySQL/MariaDB
- Frontend: HTML/CSS/JS puro ou com Tailwind CSS (como no sxconnect-home.html)
- Painel admin separado com autenticação
- API REST para gerenciar conteúdo
- Deploy fácil via Docker

## Estrutura do site composta atual
HOME:
- Hero: "Transforme Conversas em Clientes"
- Números: atendimento rápido, CRM, 24h, funil vendas
- Sobre a SXConnect
- Soluções: Impakt IA, SX CRM, WhatsApp Business, Agenda Cheia
- Como Funciona (4 passos)
- Para Quem é (prestadores, pequenas empresas)
- Diferenciais
- Planos: Início R$149,90, Crescimento R$297, Empreendedor R$499, Implantação Estratégica
- Área de Notícias/Blog (inspirada em flixli.png)
- CTA final
- Footer com contatos

Menu:
HOME | SOBRE | SOLUÇÕES | PLANOS | BLOG | CONTATO

## Funcionalidades do CMS
1. **Gerenciar Páginas**
   - Criar/editar/excluir páginas
   - Título, slug, conteúdo HTML, ordem
   - Checkbox: "Mostrar no menu principal"
   - Editor de conteúdo simples (textarea HTML ou WYSIWYG)

2. **Gerenciar Seções da Home**
   - Criar/editar/excluir seções
   - Tipos de seção: hero, texto, cards, grid de soluções, planos, notícias, CTA, footer
   - Campos por seção: título, subtítulo, conteúdo, imagem, ordem, visibilidade
   - Reordenar seções via drag-and-drop ou campo ordem

3. **Gerenciar Notícias/Blog**
   - CRUD de notícias
   - Título, resumo, conteúdo, imagem, categoria, tags, data
   - Listagem na home no estilo flixli.png: destaque principal + lista lateral
   - Página individual de notícia
   - Slug automático

4. **Gerenciar Menu**
   - Definir itens do menu principal
   - Vincular a páginas criadas
   - Reordenar itens
   - Menu dropdown para SOLUÇÕES com subitens

5. **Gerenciar Soluções**
   - CRUD de soluções/produtos
   - Ícone, título, descrição, recursos/lista
   - Ordem de exibição
   - Usar em seções de soluções e no menu dropdown

## Design
- Manter identidade visual atual: slate/azul escuro, fonte Inter, gradientes
- Responsivo: mobile, tablet, desktop
- Admin: tema escuro, limpo, funcional

## Banco de dados
Tabelas sugeridas:
- users (admin auth)
- pages (páginas do site)
- sections (seções da home)
- posts (notícias/blog)
- categories (categorias de posts)
- menu_items (itens do menu)
- solutions (soluções/produtos)
- settings (configurações gerais do site)

## Entregáveis
- Projeto completo em `/home/silvano/Área de trabalho/SxConnect/Clientes/sxconnect-site/cms/`
- README.md com instruções de instalação
- Dockerfile + docker-compose.yml
- Script de seed com dados iniciais
- Admin funcional com login
- Site público renderizado dinamicamente a partir do CMS

## Regras
- Não quebrar funcionalidades existentes
- Código limpo e documentado
- Usar apenas dependências necessárias
- Seguir padrões de segurança básicos (sanitização, auth, validação)
