const bcrypt = require('bcryptjs');
const db = require('../config/database');
const config = require('../config');
const slugify = require('slugify');

async function seed() {
  const [[{ count }]] = await db.query('SELECT COUNT(*) as count FROM users');
  if (count > 0) return;

  console.log('Executando seed inicial...');

  const hash = await bcrypt.hash(config.admin.password, 10);
  await db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', ['Administrador', config.admin.email, hash]);

  await db.query('INSERT INTO categories (name, slug) VALUES (?, ?)', ['Dicas', 'dicas']);

  await db.query('INSERT INTO categories (name, slug) VALUES (?, ?)', ['Novidades', 'novidades']);

  const pageContent1 = '<section class="py-20"><div class="max-w-4xl mx-auto px-6"><h1 class="text-4xl font-bold mb-6">Sobre a SxConnect</h1><p class="text-lg text-slate-300 mb-4">A SxConnect nasceu para ajudar empreendedores a vender mais, atender melhor e organizar seus clientes utilizando tecnologia e inteligencia artificial.</p><p class="text-lg text-slate-300 mb-4">Unimos experiencia comercial, automacao e IA para transformar o WhatsApp em uma verdadeira ferramenta de crescimento.</p><p class="text-lg text-slate-300">Nossa missao e simples: ajudar pequenas empresas a competir com grandes empresas utilizando tecnologia acessivel.</p></div></section>';
  await db.query('INSERT INTO pages (title, slug, content, show_in_menu, menu_order) VALUES (?, ?, ?, ?, ?)', ['Sobre', 'sobre', pageContent1, 1, 1]);

  const pageContent2 = '<section class="py-20"><div class="max-w-4xl mx-auto px-6"><h1 class="text-4xl font-bold mb-6">Contato</h1><p class="text-lg text-slate-300 mb-8">Entre em contato conosco pelos canais abaixo:</p><div class="grid md:grid-cols-2 gap-6"><div class="bg-slate-800 p-6 rounded-xl"><h3 class="text-xl font-bold mb-2">WhatsApp</h3><p class="text-slate-300">(11) 99999-9999</p></div><div class="bg-slate-800 p-6 rounded-xl"><h3 class="text-xl font-bold mb-2">E-mail</h3><p class="text-slate-300">contato@sxconnect.com.br</p></div><div class="bg-slate-800 p-6 rounded-xl"><h3 class="text-xl font-bold mb-2">Instagram</h3><p class="text-slate-300">@sxconnect</p></div></div></div></section>';
  await db.query('INSERT INTO pages (title, slug, content, show_in_menu, menu_order) VALUES (?, ?, ?, ?, ?)', ['Contato', 'contato', pageContent2, 1, 5]);

  await db.query(`INSERT INTO sections (type, title, subtitle, content, extra, visible, section_order) VALUES
    ('hero', 'Transforme Conversas em Clientes', 'Atendimento inteligente, CRM, automacao e inteligencia artificial para pequenas empresas.', 'Voce cuida do seu negocio. A SxConnect cuida de trazer, atender e organizar seus clientes.', '{"cta_primary": "Conhecer Solucoes", "cta_secondary": "Falar com um Especialista", "stats": [{"value": "24/7", "label": "Atendimento"}, {"value": "100%", "label": "Automatizado"}, {"value": "+Leads", "label": "Qualificados"}, {"value": "+Vendas", "label": "Conversao"}]}', 1, 0)`);

  await db.query(`INSERT INTO solutions (title, slug, subtitle, description, icon, features, cta_text, cta_link, display_order, published) VALUES
    ('Impakt IA', 'impakt-ia', 'Seu novo atendente digital', 'Treinado com o DNA da sua empresa. O Impakt IA aprende seus servicos, responde duvidas, qualifica clientes, organiza atendimentos e funciona 24 horas por dia.', 'robot', '["Aprende seus servicos", "Responde duvidas", "Qualifica clientes", "Organiza atendimentos", "Funciona 24 horas por dia"]', 'Conhecer Impakt IA', '/solucoes/impakt-ia', 0, 1),
    ('SX CRM', 'sx-crm', 'Organize seus clientes e oportunidades', 'Centralize atendimentos e acompanhe cada oportunidade comercial.', 'clipboard', '["Funil de vendas", "Historico de clientes", "Relatorios", "Gestao de oportunidades", "Controle de atendimento"]', 'Conhecer SX CRM', '/solucoes/sx-crm', 1, 1),
    ('WhatsApp Business', 'whatsapp-business', 'Conecte sua empresa ao principal canal de comunicacao', 'WhatsApp integrado, atendimento centralizado, respostas rapidas e equipe organizada.', 'whatsapp', '["WhatsApp integrado", "Atendimento centralizado", "Respostas rapidas", "Equipe organizada"]', 'Conhecer WhatsApp', '/solucoes/whatsapp-business', 2, 1),
    ('Desafio Agenda Cheia', 'agenda-cheia', 'Programa de implantacao em 7 dias', 'Diagnostico, treinamento da IA, organizacao dos atendimentos, configuracao do CRM e relatorio de crescimento.', 'rocket', '["Diagnostico da empresa", "Treinamento da IA", "Organizacao dos atendimentos", "Configuracao do CRM", "Relatorio de crescimento"]', 'Saiba mais', '/solucoes/agenda-cheia', 3, 1)`);

  await db.query(`INSERT INTO menu_items (label, url, parent_id, menu_order) VALUES
    ('HOME', '/', NULL, 0),
    ('SOBRE', '/sobre', NULL, 1),
    ('SOLUCOES', '#', NULL, 2),
    ('IMPACT IA', '/solucoes/impakt-ia', 3, 0),
    ('SX CRM', '/solucoes/sx-crm', 3, 1),
    ('WhatsApp Business', '/solucoes/whatsapp-business', 3, 2),
    ('Agenda Cheia', '/solucoes/agenda-cheia', 3, 3),
    ('PLANOS', '/#planos', NULL, 4),
    ('BLOG', '/blog', NULL, 5),
    ('CONTATO', '/contato', NULL, 6)`);

  await db.query("INSERT INTO settings (setting_key, setting_value) VALUES ('site_name', 'SxConnect'), ('site_description', 'Atendimento Inteligente com IA'), ('contact_whatsapp', '5511999999999'), ('contact_email', 'contato@sxconnect.com.br'), ('contact_instagram', 'sxconnect')");

  console.log('Seed concluido.');
}

module.exports = { seed };
