const db = require('../config/database');

const Category = {
  async findAll() {
    const [rows] = await db.query('SELECT * FROM categories ORDER BY name ASC');
    return rows;
  },

  async findById(id) {
    const [rows] = await db.query('SELECT * FROM categories WHERE id = ?', [id]);
    return rows[0] || null;
  },

  async findBySlug(slug) {
    const [rows] = await db.query('SELECT * FROM categories WHERE slug = ?', [slug]);
    return rows[0] || null;
  },

  async create(data) {
    const [result] = await db.query('INSERT INTO categories (name, slug) VALUES (?, ?)', [data.name, data.slug]);
    return { id: result.insertId };
  },

  async update(id, data) {
    await db.query('UPDATE categories SET name = ?, slug = ? WHERE id = ?', [data.name, data.slug, id]);
  },

  async delete(id) {
    await db.query('DELETE FROM categories WHERE id = ?', [id]);
  }
};

module.exports = Category;
