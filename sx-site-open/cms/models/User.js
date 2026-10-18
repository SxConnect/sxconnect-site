const bcrypt = require('bcryptjs');
const db = require('../config/database');

const User = {
  async findByEmail(email) {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0] || null;
  },

  async findById(id) {
    const [rows] = await db.query('SELECT id, name, email, created_at FROM users WHERE id = ?', [id]);
    return rows[0] || null;
  },

  async create(data) {
    const hash = await bcrypt.hash(data.password, 10);
    const [result] = await db.query(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [data.name, data.email, hash]
    );
    return { id: result.insertId };
  },

  async validatePassword(password, hash) {
    return bcrypt.compare(password, hash);
  }
};

module.exports = User;
