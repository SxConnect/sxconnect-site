const db = require('../config/database');
const slugify = require('slugify');

const Solution = {
  async findAll({ published } = {}) {
    let sql = 'SELECT * FROM solutions WHERE 1=1';
    const params = [];
    if (published !== undefined) { sql += ' AND published = ?'; params.push(published); }
    sql += ' ORDER BY display_order ASC';
    const [rows] = await db.query(sql, params);
    return rows.map(r => ({ ...r, features: r.features ? JSON.parse(r.features) : [] }));
  },

  async findById(id) {
    const [rows] = await db.query('SELECT * FROM solutions WHERE id = ?', [id]);
    if (!rows[0]) return null;
    const r = rows[0];
    r.features = r.features ? JSON.parse(r.features) : [];
    return r;
  },

  async findBySlug(slug) {
    const [rows] = await db.query('SELECT * FROM solutions WHERE slug = ?', [slug]);
    if (!rows[0]) return null;
    const r = rows[0];
    r.features = r.features ? JSON.parse(r.features) : [];
    return r;
  },

  async create(data) {
    const slug = data.slug || slugify(data.title, { lower: true, strict: true });
    const [result] = await db.query(
      `INSERT INTO solutions (title, slug, subtitle, description, icon, features, cta_text, cta_link, display_order, published)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [data.title, slug, data.subtitle, data.description, data.icon, data.features ? JSON.stringify(data.features) : null, data.cta_text, data.cta_link, data.display_order || 0, data.published !== undefined ? data.published : 1]
    );
    return { id: result.insertId, slug };
  },

  async update(id, data) {
    const slug = data.slug || slugify(data.title, { lower: true, strict: true });
    await db.query(
      `UPDATE solutions SET title = ?, slug = ?, subtitle = ?, description = ?, icon = ?, features = ?, cta_text = ?, cta_link = ?, display_order = ?, published = ? WHERE id = ?`,
      [data.title, slug, data.subtitle, data.description, data.icon, data.features ? JSON.stringify(data.features) : null, data.cta_text, data.cta_link, data.display_order || 0, data.published !== undefined ? data.published : 1, id]
    );
    return { id, slug };
  },

  async delete(id) {
    await db.query('DELETE FROM solutions WHERE id = ?', [id]);
  }
};

module.exports = Solution;
