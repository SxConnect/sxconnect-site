const db = require('../config/database');
const slugify = require('slugify');

const Post = {
  async findAll({ published, categoryId, featured, limit } = {}) {
    let sql = `SELECT p.*, c.name as category_name, c.slug as category_slug
               FROM posts p LEFT JOIN categories c ON p.category_id = c.id WHERE 1=1`;
    const params = [];
    if (published !== undefined) { sql += ' AND p.published = ?'; params.push(published); }
    if (categoryId) { sql += ' AND p.category_id = ?'; params.push(categoryId); }
    if (featured !== undefined) { sql += ' AND p.featured = ?'; params.push(featured); }
    sql += ' ORDER BY p.created_at DESC';
    if (limit) { sql += ' LIMIT ?'; params.push(limit); }
    const [rows] = await db.query(sql, params);
    return rows;
  },

  async findById(id) {
    const [rows] = await db.query(
      `SELECT p.*, c.name as category_name, c.slug as category_slug
       FROM posts p LEFT JOIN categories c ON p.category_id = c.id WHERE p.id = ?`, [id]);
    return rows[0] || null;
  },

  async findBySlug(slug) {
    const [rows] = await db.query(
      `SELECT p.*, c.name as category_name, c.slug as category_slug
       FROM posts p LEFT JOIN categories c ON p.category_id = c.id WHERE p.slug = ?`, [slug]);
    return rows[0] || null;
  },

  async create(data) {
    const slug = data.slug || slugify(data.title, { lower: true, strict: true });
    const [result] = await db.query(
      `INSERT INTO posts (title, slug, excerpt, content, image, category_id, tags, featured, published)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [data.title, slug, data.excerpt, data.content, data.image, data.category_id || null, data.tags || null, data.featured || 0, data.published !== undefined ? data.published : 1]
    );
    return { id: result.insertId, slug };
  },

  async update(id, data) {
    const slug = data.slug || slugify(data.title, { lower: true, strict: true });
    await db.query(
      `UPDATE posts SET title = ?, slug = ?, excerpt = ?, content = ?, image = ?, category_id = ?, tags = ?, featured = ?, published = ? WHERE id = ?`,
      [data.title, slug, data.excerpt, data.content, data.image, data.category_id || null, data.tags || null, data.featured || 0, data.published !== undefined ? data.published : 1, id]
    );
    return { id, slug };
  },

  async delete(id) {
    await db.query('DELETE FROM posts WHERE id = ?', [id]);
  }
};

module.exports = Post;
