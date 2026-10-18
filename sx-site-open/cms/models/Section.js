const db = require('../config/database');

const Section = {
  async findAll({ visible } = {}) {
    let sql = 'SELECT * FROM sections WHERE 1=1';
    const params = [];
    if (visible !== undefined) { sql += ' AND visible = ?'; params.push(visible); }
    sql += ' ORDER BY section_order ASC';
    const [rows] = await db.query(sql, params);
    return rows.map(r => ({ ...r, extra: r.extra ? JSON.parse(r.extra) : null }));
  },

  async findById(id) {
    const [rows] = await db.query('SELECT * FROM sections WHERE id = ?', [id]);
    if (!rows[0]) return null;
    const r = rows[0];
    r.extra = r.extra ? JSON.parse(r.extra) : null;
    return r;
  },

  async create(data) {
    const [result] = await db.query(
      'INSERT INTO sections (type, title, subtitle, content, image, extra, visible, section_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [data.type, data.title, data.subtitle, data.content, data.image, data.extra ? JSON.stringify(data.extra) : null, data.visible !== undefined ? data.visible : 1, data.section_order || 0]
    );
    return { id: result.insertId };
  },

  async update(id, data) {
    await db.query(
      'UPDATE sections SET type = ?, title = ?, subtitle = ?, content = ?, image = ?, extra = ?, visible = ?, section_order = ? WHERE id = ?',
      [data.type, data.title, data.subtitle, data.content, data.image, data.extra ? JSON.stringify(data.extra) : null, data.visible !== undefined ? data.visible : 1, data.section_order || 0, id]
    );
    return { id };
  },

  async delete(id) {
    await db.query('DELETE FROM sections WHERE id = ?', [id]);
  }
};

module.exports = Section;
