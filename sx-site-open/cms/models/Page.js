const db = require('../config/database');
const slugify = require('slugify');

const Page = {
  async findAll({ published, showInMenu } = {}) {
    let sql = 'SELECT * FROM pages WHERE 1=1';
    const params = [];
    if (published !== undefined) { sql += ' AND published = ?'; params.push(published); }
    if (showInMenu !== undefined) { sql += ' AND show_in_menu = ?'; params.push(showInMenu); }
    sql += ' ORDER BY menu_order ASC, title ASC';
    const [rows] = await db.query(sql, params);
    return rows;
  },

  async findById(id) {
    const [rows] = await db.query('SELECT * FROM pages WHERE id = ?', [id]);
    return rows[0] || null;
  },

  async findBySlug(slug) {
    const [rows] = await db.query('SELECT * FROM pages WHERE slug = ?', [slug]);
    return rows[0] || null;
  },

  async create(data) {
    const slug = data.slug || slugify(data.title, { lower: true, strict: true });
    const [result] = await db.query(
      'INSERT INTO pages (title, slug, content, show_in_menu, menu_order, published) VALUES (?, ?, ?, ?, ?, ?)',
      [data.title, slug, data.content, data.show_in_menu || 0, data.menu_order || 0, data.published !== undefined ? data.published : 1]
    );
    return { id: result.insertId, slug };
  },

  async update(id, data) {
    const slug = data.slug || slugify(data.title, { lower: true, strict: true });
    await db.query(
      'UPDATE pages SET title = ?, slug = ?, content = ?, show_in_menu = ?, menu_order = ?, published = ? WHERE id = ?',
      [data.title, slug, data.content, data.show_in_menu || 0, data.menu_order || 0, data.published !== undefined ? data.published : 1, id]
    );
    return { id, slug };
  },

  async delete(id) {
    await db.query('DELETE FROM pages WHERE id = ?', [id]);
  }
};

module.exports = Page;
