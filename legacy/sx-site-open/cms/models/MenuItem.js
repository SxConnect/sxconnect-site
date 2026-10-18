const db = require('../config/database');

const MenuItem = {
  async findAll() {
    const [rows] = await db.query(
      `SELECT m.*, p.title as page_title
       FROM menu_items m LEFT JOIN pages p ON m.page_id = p.id
       ORDER BY m.menu_order ASC`
    );
    return rows;
  },

  async findTree() {
    const all = await this.findAll();
    const parents = all.filter(i => !i.parent_id);
    const children = all.filter(i => i.parent_id);

    return parents.map(p => ({
      ...p,
      children: children.filter(c => c.parent_id === p.id)
    }));
  },

  async findById(id) {
    const [rows] = await db.query('SELECT * FROM menu_items WHERE id = ?', [id]);
    return rows[0] || null;
  },

  async create(data) {
    const [result] = await db.query(
      'INSERT INTO menu_items (label, url, page_id, parent_id, menu_order, target) VALUES (?, ?, ?, ?, ?, ?)',
      [data.label, data.url, data.page_id || null, data.parent_id || null, data.menu_order || 0, data.target || '_self']
    );
    return { id: result.insertId };
  },

  async update(id, data) {
    await db.query(
      'UPDATE menu_items SET label = ?, url = ?, page_id = ?, parent_id = ?, menu_order = ?, target = ? WHERE id = ?',
      [data.label, data.url, data.page_id || null, data.parent_id || null, data.menu_order || 0, data.target || '_self', id]
    );
  },

  async delete(id) {
    await db.query('DELETE FROM menu_items WHERE id = ? OR parent_id = ?', [id, id]);
  }
};

module.exports = MenuItem;
